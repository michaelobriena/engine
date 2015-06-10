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
        offset[sequential.options.direction] += children[i].getChildren()[0].getSize()[sequential.options.direction];
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
    console.log(options)
    if (options.direction != null) this.setDirection(options.direction);
    if (options.itemSpacing) this.setItemSpacing(options.itemSpacing);
    if (options.itemSize) this.setItemSize(options.itemSize);
};

Sequential.prototype.setDirection = function setDirection(direction) {
    console.log(direction)
    this.options.direction = direction;
};

Sequential.prototype.setItemSpacing = function setItemSpacing(itemSpacing) {
    this.options.itemSpacing = itemSpacing;  
};

Sequential.prototype.setItemSize = function setItemSize(itemSize) {
    this.options.setItemSize = setItemSize;
};

module.exports = Sequential;
