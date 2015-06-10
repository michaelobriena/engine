var Node = require('../core/Node');

function Sequential(options) {
    this.options = Object.create(Sequential.DEFAULT_PROPERTIES);
    Node.apply(this, options);

    this.setOptions(options);
}

Sequential.prototype = Object.create(Node.prototype);
Sequential.prototype.constructor = Sequential;

Sequential.DEFAULT_PROPERTIES = {
    itemSpacing: 0,
    direction: 1
};

function _layout(sequential) {
    var children = Node.prototype.getChildren.call(sequential);
    var len = children.length;
    var offset = [0, 0, 0];

    for (var i = 0; i < len; i++) {
        children[i].setPosition.apply(children[i], offset);
        offset[sequential.options.direction] += children[i].getChildren()[0].getSize()[sequential.options.direction] + sequential.options.itemSpacing;
    }
}

Sequential.prototype.addChild = function addChild() {
    var layoutNode = Node.prototype.addChild.call(this);
    var exposedChild = layoutNode.addChild();
    var _this = this;

    exposedChild.addComponent({
        onSizeChange: function() {
            _layout(_this);
        }
    });

    return exposedChild;
};

Sequential.prototype.setOptions = function setOptions(options) {
    if (!options) return;
    if (options.direction != null) this.setDirection(options.direction);
    if (options.itemSpacing) this.setItemSpacing(options.itemSpacing);
};

Sequential.prototype.getOptions = function getOptions() {
    return this.options;
};

Sequential.prototype.setOption = function setOption(key, value) {
    this.options[key] = value;
    _layout(this);
};

Sequential.prototype.getOption = function getOption(key) {
    return this.options[key];
};

Sequential.prototype.setDirection = function setDirection(direction) {
    this.options.direction = direction;
    _layout(this);
};

Sequential.prototype.getDirection = function getDirection() {
    return this.options.direction;
};

Sequential.prototype.setItemSpacing = function setItemSpacing(itemSpacing) {
    this.options.itemSpacing = itemSpacing;  
    _layout(this);
};

Sequential.prototype.getItemSpacing = function getItemSpacing() {
    return this.options.itemSpacing;
};

module.exports = Sequential;
