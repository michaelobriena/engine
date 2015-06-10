var Node = require('../core/Node');

function HeaderFooter(options) {
    this.options = Object.create(HeaderFooter.DEFAULT_PROPERTIES);
    Node.apply(this, options);

    this.setOptions(options);

    this.header = {};
    this.body = {};
    this.footer = {};
    this.__childCounter = 0;

    _initSubTree(this);
    _layout(this);

    var _this = this;
    this.addComponent({
        onSizeChange: function() {
            _layout(_this);
        }
    });
}

HeaderFooter.prototype = Object.create(Node.prototype);
HeaderFooter.prototype.constructor = HeaderFooter;

HeaderFooter.DEFAULT_PROPERTIES = {
    headerSize: 100,
    footerSize: 100
};

function _layout(headerFooter) {
    if (!headerFooter.header) return;

    headerFooter.header.layoutNode.setAbsoluteSize(null, headerFooter.options.headerSize);
    headerFooter.body.layoutNode.setDifferentialSize(null, -(headerFooter.options.headerSize + headerFooter.options.footerSize));
    headerFooter.body.layoutNode.setPosition(0, headerFooter.options.headerSize);
    headerFooter.footer.layoutNode.setAbsoluteSize(null, headerFooter.options.footerSize);
}

function _initSubTree(headerFooter) {
    headerFooter.header.layoutNode = Node.prototype.addChild.call(headerFooter);
    headerFooter.header.layoutNode.setSizeMode(0, 1, 0);
    headerFooter.header.exposedNode = headerFooter.header.layoutNode.addChild();

    headerFooter.body.layoutNode = Node.prototype.addChild.call(headerFooter);
    headerFooter.body.exposedNode = headerFooter.body.layoutNode.addChild();

    headerFooter.footer.layoutNode = Node.prototype.addChild.call(headerFooter);
    headerFooter.footer.layoutNode.setSizeMode(0, 1, 0);
    headerFooter.footer.layoutNode.setAlign(0, 1, 0);
    headerFooter.footer.layoutNode.setMountPoint(0, 1, 0);
    headerFooter.footer.exposedNode = headerFooter.footer.layoutNode.addChild();
}

HeaderFooter.prototype.addChild = function addChild() {
    switch (this.__childCounter) {
        case 0:
            this.__childCounter++;
            return this.header.exposedNode;
        case 1:
            this.__childCounter++;
            return this.body.exposedNode;
        case 2:
            this.__childCounter++;
            return this.footer.exposedNode;
        default:
            return null;
    }
};

HeaderFooter.prototype.getChildren = function getChildren() {
    return [
        this.header.exposedNode,
        this.body.exposedNode,
        this.footer.exposedNode,
    ];
};

HeaderFooter.prototype.getHeader = function getHeader() {
    return this.header.exposedNode;
};

HeaderFooter.prototype.getBody = function getBody() {
    return this.body.exposedNode;
};

HeaderFooter.prototype.getFooter = function getFooter() {
    return this.footer.exposedNode;
};

HeaderFooter.prototype.setOptions = function setOptions(options) {
    if (!options) return
    if (options.headerSize) this.setHeaderSize(options.headerSize);
    if (options.footerSize) this.setFooterSize(options.footerSize);
};

HeaderFooter.prototype.getOptions = function getOptions() {
    return this.options;
};

HeaderFooter.prototype.setHeaderSize = function setHeaderSize(headerSize) {
    this.options.headerSize = headerSize;
    _layout(this);
};

HeaderFooter.prototype.getHeaderSize = function getHeaderSize() {
    return this.options.headerSize;
};

HeaderFooter.prototype.setFooterSize = function setHeaderSize(footerSize) {
    this.options.footerSize = footerSize;
    _layout(this);
};

HeaderFooter.prototype.getFooterSize = function getFooterSize() {
    return this.options.footerSize;
};

module.exports = HeaderFooter;
