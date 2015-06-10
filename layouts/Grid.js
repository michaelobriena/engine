var Node = require('../core/Node');

function Grid(options) {
    this.options = Object.create(Grid.DEFAULT_PROPERTIES);
    Node.apply(this, options);

    this.dimensions = [0, 0];
    this.verticalSpacing = 0;
    this.horizontalSpacing = 0;
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
    if (!grid.getParent()) return;

    var parentSize = grid.getParent().getSize();
    var usableSize = [
        parentSize[0] - (grid.verticalSpacing * (grid.dimensions[0] - 1)),
        parentSize[1] - (grid.horizontalSpacing * (grid.dimensions[1] - 1))
    ];
    var itemSize = [usableSize[0] / grid.dimensions[0], usableSize[1] / grid.dimensions[1]];
    var offsetX = 0;
    var offsetY = 0;
    var children = grid._getChildren();
    var layoutNode;

    for (var i = 0; i < grid.dimensions[0]; i++) {
        for (var j = 0; j < grid.dimensions[1]; j++) {
            layoutNode = children[i * grid.dimensions[1] + j];
            layoutNode.setAbsoluteSize(itemSize[0], itemSize[1]);
            layoutNode.setPosition(offsetX, offsetY);
            offsetX += (grid.verticalSpacing + itemSize[0]);
        }

        offsetX = 0;
        offsetY += (grid.horizontalSpacing + itemSize[1]);
    }
}

function _manageLayoutNodes(grid) {
    var totalNodesNeeded = grid.dimensions[0] * grid.dimensions[1];
    var numChildrenNeeded = totalNodesNeeded - grid._getChildren().length;
    var layoutNode;

    while(numChildrenNeeded--) {
        layoutNode = grid.addChild();
        layoutNode.setSizeMode(1, 1, 0);

        layoutNode.addChild();
    };

    _layout(grid);
}

Grid.prototype._getChildren = function _getChildren() {
    return this._children;
};

Grid.prototype.getChildren = function getChildren() {
    var children = this._getChildren();
    var len = children.length;
    var result = [];

    for (var i = 0; i < len; i++) result.push(children[i].getChildren()[0]);

    return result;
};

Grid.prototype.getChildAtIndex = function getChildAtIndex(index) {
    return this._getChildren()[index].getChildren()[0];
};

Grid.prototype.getRow = function getRow(index) {
    var result = [];
    var children = this._getChildren();
    
    for (var i = 0; i < this.dimensions[1]; i++) {
        result.push(children[row * this.dimensions[1] + i].getChildren()[0])
    }

    return result;
};

Grid.prototype.getColumn = function getColumn(index) {
    var result = [];
    var children = this._getChildren();
    
    for (var i = 0; i < this.dimensions[0]; i++) {
        result.push(children[i])
    }

    return result;
};

Grid.prototype.getChildAtRowColumn = function getChildAtRowColumn(row, col) {
    return this._getChildren()[row * this.dimensions[1] + col].getChildren()[0];
};

Grid.prototype.setOptions = function setOptions(options) {
    if (options.dimensions) this.setDimensions(options.dimensions[0], options.dimensions[1]);
    if (options.verticalSpacing) this.setVerticalSpacing(options.verticalSpacing);
    if (options.horizontalSpacing) this.setHorizontalSpacing(options.horizontalSpacing);
};

Grid.prototype.setVerticalSpacing = function setVerticalSpacing(verticalSpacing) {
    this.verticalSpacing = verticalSpacing;
    _layout(this);
};

Grid.prototype.getVerticalSpacing = function getVerticalSpacing() {
    return this.verticalSpacing;
};

Grid.prototype.setHorizontalSpacing = function setHorizontalSpacing(horizontalSpacing) {
    this.horizontalSpacing = horizontalSpacing;
    _layout(this);
};

Grid.prototype.getHorizontalSpacing = function getHorizontalSpacing() {
    return this.horizontalSpacing;
};

Grid.prototype.setDimensions = function setDimensions(x, y) {
    this.dimensions[0] = x;
    this.dimensions[1] = y;
    _manageLayoutNodes(this);
};

Grid.prototype.getDimensions = function getDimensions() {
    return this.dimensions;
};

module.exports = Grid;
