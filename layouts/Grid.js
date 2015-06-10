var Node = require('../core/Node');

function Grid(options) {
    this.options = Object.create(Grid.DEFAULT_PROPERTIES);
    Node.apply(this, options);

    this.setOptions(options);

    _layout(this);

    var _this = this;
    this.addComponent({
        onSizeChange: function(size) {
            _layout(_this);
        }
    });
}

Grid.prototype = Object.create(Node.prototype);
Grid.prototype.constructor = Grid;

Grid.DEFAULT_PROPERTIES = {
    dimensions: [0, 0],
    verticalSpacing: 0,
    horizontalSpacing: 0
};

function _layout(grid) {
    var size = grid.getSize();
    var usableSize = [
        size[0] - (grid.options.verticalSpacing * (grid.options.dimensions[0] - 1)),
        size[1] - (grid.options.horizontalSpacing * (grid.options.dimensions[1] - 1))
    ];
    var itemSize = [usableSize[0] / grid.options.dimensions[0], usableSize[1] / grid.options.dimensions[1]];
    var offsetX = 0;
    var offsetY = 0;
    var children = Node.prototype.getChildren.call(grid);
    var layoutNode;

    for (var i = 0; i < grid.options.dimensions[0]; i++) {
        for (var j = 0; j < grid.options.dimensions[1]; j++) {
            layoutNode = children[i * grid.options.dimensions[1] + j];

            if (!layoutNode) return;

            layoutNode.setAbsoluteSize(itemSize[0], itemSize[1]);
            layoutNode.setPosition(offsetX, offsetY);
            offsetX += (grid.options.verticalSpacing + itemSize[0]);
        }

        offsetX = 0;
        offsetY += (grid.options.horizontalSpacing + itemSize[1]);
    }
}

Grid.prototype.getChildren = function getChildren() {
    var children = Node.prototype.getChildren.call(this);
    var len = children.length;
    var result = [];

    for (var i = 0; i < len; i++) result.push(children[i].getChildren()[0]);

    return result;
};

Grid.prototype.addChild = function addChild() {
    var layoutNode = Node.prototype.addChild.call(this);
    layoutNode.setSizeMode(1, 1, 0);
    layoutNode.addChild();
    _layout(this);

    return layoutNode;
};


Grid.prototype.getChildAtIndex = function getChildAtIndex(index) {
    return Node.prototype.getChildren.call(this)[index].getChildren()[0];
};

Grid.prototype.getRow = function getRow(index) {
    var result = [];
    var children = Node.prototype.getChildren.call(this);
    
    for (var i = 0; i < this.options.dimensions[1]; i++) {
        result.push(children[row * this.options.dimensions[1] + i].getChildren()[0])
    }

    return result;
};

Grid.prototype.getColumn = function getColumn(index) {
    var result = [];
    var children = Node.prototype.getChildren.call(this);
    
    for (var i = 0; i < this.options.dimensions[0]; i++) {
        result.push(children[i])
    }

    return result;
};

Grid.prototype.getChildAtRowColumn = function getChildAtRowColumn(row, col) {
    return Node.prototype.getChildren.call(this)[row * this.options.dimensions[1] + col].getChildren()[0];
};

Grid.prototype.setOptions = function setOptions(options) {
    if (options.dimensions) this.setDimensions(options.dimensions[0], options.dimensions[1]);
    if (options.verticalSpacing) this.setVerticalSpacing(options.verticalSpacing);
    if (options.horizontalSpacing) this.setHorizontalSpacing(options.horizontalSpacing);
};

Grid.prototype.setVerticalSpacing = function setVerticalSpacing(verticalSpacing) {
    this.options.verticalSpacing = verticalSpacing;
    _layout(this);
};

Grid.prototype.getVerticalSpacing = function getVerticalSpacing() {
    return this.options.verticalSpacing;
};

Grid.prototype.setHorizontalSpacing = function setHorizontalSpacing(horizontalSpacing) {
    this.options.horizontalSpacing = horizontalSpacing;
    _layout(this);
};

Grid.prototype.getHorizontalSpacing = function getHorizontalSpacing() {
    return this.options.horizontalSpacing;
};

Grid.prototype.setDimensions = function setDimensions(x, y) {
    this.options.dimensions[0] = x;
    this.options.dimensions[1] = y;
};

Grid.prototype.getDimensions = function getDimensions() {
    return this.options.dimensions;
};

module.exports = Grid;
