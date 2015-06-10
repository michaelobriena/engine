var Node = require('../core/Node');

function PaddedNode(options) {
    this.options = Object.create(PaddedNode.DEFAULT_PROPERTIES);
    Node.apply(this, this.options);

    this.setOptions(options);

    this.layoutNode = Node.prototype.addChild.call(this);
    this.layoutNode.setSizeMode(1, 1, 0);

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
    topPadding: 0,
    rightPadding: 0,
    bottomPadding: 0,
    leftPadding: 0
};

function _layout(paddedNode) {
    if (!paddedNode.getParent()) return;

    var parentSize = paddedNode.getSize();

    paddedNode.layoutNode.setPosition(paddedNode.options.leftPadding, paddedNode.options.topPadding);

    paddedNode.layoutNode.setAbsoluteSize(
        parentSize[0] - paddedNode.options.leftPadding - paddedNode.options.rightPadding,
        parentSize[1] - paddedNode.options.topPadding - paddedNode.options.bottomPadding);
}

PaddedNode.prototype.addChild = function addChild(child) {
    return this.layoutNode.addChild.call(this.layoutNode, child);
};

PaddedNode.prototype.getChildren = function getChildren() {
    return this.layoutNode.getChildren.call(this.layoutNode);
};

PaddedNode.prototype.setOptions = function setOptions(options) {
    if (!options) return;
    if (options.topPadding) this.setTopPadding(options.topPadding);
    if (options.rightPadding) this.setRightPadding(options.rightPadding);
    if (options.bottomPadding) this.setBottomPadding(options.bottomPadding);
    if (options.leftPadding) this.setLeftPadding(options.leftPadding);
};

PaddedNode.prototype.getOptions = function getOptions() {
    return this.options;
};

PaddedNode.prototype.setOption = function setOption(key, value) {
    this.options[key] = value;
    _layout(this);
};

PaddedNode.prototype.getOption = function getOption(key) {
    return this.options[key];
};

PaddedNode.prototype.setTopPadding = function setTopPadding(topPadding) {
    this.options.topPadding = topPadding;
    _layout(this);
};

PaddedNode.prototype.getTopPadding = function getTopPadding(topPadding) {
    return this.options.topPadding;
};

PaddedNode.prototype.setRightPadding = function setRightPadding(rightPadding) {
    this.options.rightPadding = rightPadding;
    _layout(this);
};

PaddedNode.prototype.getRightPadding = function getRightPadding(rightPadding) {
    return this.options.rightPadding;
};

PaddedNode.prototype.setBottomPadding = function setBottomPadding(bottomPadding) {
    this.options.bottomPadding = bottomPadding;
    _layout(this);
};

PaddedNode.prototype.getBottomPadding = function getBottomPadding(bottomPadding) {
    return this.options.bottomPadding;
};

PaddedNode.prototype.setLeftPadding = function setLeftPadding(leftPadding) {
    this.options.leftPadding = leftPadding;
    _layout(this);
};

PaddedNode.prototype.getLeftPadding = function getLeftPadding(leftPadding) {
    return this.options.leftPadding;
};

module.exports = PaddedNode;
