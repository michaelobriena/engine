var Node = require('../core/Node');

function PaddedNode(options) {
    this.options = options || {};
    Node.apply(this, options);

    this.setOptions(options);

    this.layoutNode


    var _this = this;
    this.addComponent({
        onSizeChange: function() {
            _layout(_this);
        }
    });
}

PaddedNode.prototype = Object.create(Node.prototype);
PaddedNode.prototype.constructor = PaddedNode;

PaddedNode.DEFAULT_PROPERTIES = {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
};

function _layout(paddedNode) {
    if (!paddedNode.getParent()) return;

    var parentSize = paddedNode.getParent().getSize();

}

PaddedNode.prototype.addChild = function addChild(child) {
    return this.layoutNode.addChild.call(this.layoutNode, child);
};

PaddedNode.prototype.getChildren = function getChildren() {
    return this.layoutNode.getChildren.call(this.layoutNode);
};

PaddedNode.prototype.setPadding = function getHeader() {
    
};

PaddedNode.prototype.setTopPadding = function setTopPadding(topPadding) {
    this.options.top = topPadding;
};

PaddedNode.prototype.getTopPadding = function getTopPadding(topPadding) {
    return this.options.top;
};

PaddedNode.prototype.setRightPadding = function setRightPadding(rightPadding) {
    this.options.right = rightPadding;
};

PaddedNode.prototype.getRightPadding = function getRightPadding(topPadding) {
    return this.options.top;
};

PaddedNode.prototype.setTopPadding = function setTopPadding(topPadding) {
    this.options.top = topPadding;
};

PaddedNode.prototype.getTopPadding = function getTopPadding(topPadding) {
    return this.options.top;
};

PaddedNode.prototype.setTopPadding = function setTopPadding(topPadding) {
    this.options.top = topPadding;
};

PaddedNode.prototype.getTopPadding = function getTopPadding(topPadding) {
    return this.options.top;
};



module.exports = PaddedNode;
