import React from 'react';
import Blocks from './Blocks';

const BlockRender = ({ blocks }) => {
  const filteredBlocks = blocks.filter(componentsExists)

  if (!Array.isArray(filteredBlocks) || !filteredBlocks.length) {
    return (
      <div className="no-blocks">
        <p>No blocks added to page</p>
      </div>
    );
  }

  const renderBlocks = filteredBlocks.map(blockSerializer);

  console.log({
    filteredBlocks,
    renderBlocks
  })

  return (
    <div className="block-container">
      {renderBlocks.map(({ type, props, component: Component }, index) => (
        <Component key={type + index} {...props} />
      ))}
    </div>
  )
};

function blockSerializer(block) {
  const [{ component }] = Blocks.filter((item) => item.type === block.__typename)

  return {
    type: block.__typename,
    props: {
      data: block
    },
    component
  }
}

function componentsExists(block) {
  const blockTypes = Blocks.map((item) => item.type)

  console.log({ blockTypes, block })
  if (blockTypes.includes(block.__typename)) {
    console.log("block type exist")
    return true
  }
  return false;
}

export default BlockRender;
