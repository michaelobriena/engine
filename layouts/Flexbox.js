var Node = require('../core/Node');

function Flexbox(options) {
    this.options = Object.create(Flexbox.DEFAULT_PROPERTIES);
    Node.apply(this, options);

    this.setOptions(options);

    this.ratios = [];

    _layout(this);
    var _this = this;
    this.addComponent({
        onSizeChange: function(size) {
            _layout(_this);
        }
    });
}

Flexbox.prototype = Object.create(Node.prototype);
Flexbox.prototype.constructor = Flexbox;

Flexbox.DEFAULT_PROPERTIES = {
    itemSpacing: 0,
    direction: 1
};

function _layout(sequential) {
    var children = Node.prototype.getChildren.call(sequential);
    var len = children.length;
    var offset = [0, 0, 0];
    var size = [0, 0, 0];
    var parentSize = sequential.getSize();
    var total = _getDenominator(sequential);
    var direction = sequential.options.direction;

    for (var i = 0; i < len; i++) {
        size[0] = parentSize[0];
        size[1] = parentSize[1];
        size[2] = parentSize[2];

        size[direction] = parentSize[direction] * (sequential.ratios[i] / total);
        console.log(size)

        children[i].setPosition.apply(children[i], offset);
        children[i].setAbsoluteSize.apply(children[i], size);

        offset[direction] += size[direction]
    }
}

function _getDenominator(sequential) {
    var total = 0;

    for (var i = 0; i < sequential.ratios.length; i++) {
        if (sequential.ratios[i] !== true) total += sequential.ratios[i];
    }

    return total;
}

function _removeTrueSizeFromUsableSize(sequential, usableSize) {

}

Flexbox.prototype.addChild = function addChild() {
    var layoutNode = Node.prototype.addChild.call(this);
    layoutNode.setSizeMode(1, 1, 1);
    var exposedChild = layoutNode.addChild();

    var _this = this;
    exposedChild.addComponent({
        onSizeChange: function() {
            _layout(_this);
        }
    });

    this.ratios.push(1);

    return exposedChild;
};

Flexbox.prototype.setOptions = function setOptions(options) {
    if (options.direction != null) this.setDirection(options.direction);
    if (options.itemSpacing) this.setItemSpacing(options.itemSpacing);
    if (options.itemSize) this.setItemSize(options.itemSize);
};

Flexbox.prototype.setDirection = function setDirection(direction) {
    this.options.direction = direction;
};

Flexbox.prototype.setRatios = function setRatios(ratios) {
    this.ratios = ratios;
    _layout(this);
};

Flexbox.prototype.getRatios = function getRatios() {
    return this.ratios;
};

Flexbox.prototype.setRatioAtIndex = function setRatioAtIndex(index, ratio) {
    this.ratios[index] = ratio;
    _layout(this);
};

Flexbox.prototype.getRatioAtIndex = function getRatioAtIndex(index) {
    return this.ratios[i];
};

module.exports = Flexbox;
