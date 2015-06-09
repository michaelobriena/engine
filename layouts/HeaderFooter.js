var Node = require('../core/Node');

function HeaderFooter(options) {
    this.options = options || {};
    Node.apply(this, options);

    this.setOptions(options);

    this.header = {};
    this.body = {};
    this.footer = {};

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
    footerSize: 100,
    direction: 1
};

function _layout(headerFooter) {
    if (!headerFooter.getParent()) return;

    var parentSize = headerFooter.getParent().getSize();

    headerFooter.header.layoutNode.setAbsoluteSize(null, headerFooter.options.headerSize);
    headerFooter.body.layoutNode.setDifferentialSize(null, -(headerFooter.options.headerSize + headerFooter.options.footerSize));
    headerFooter.body.layoutNode.setPosition(0, headerFooter.options.headerSize);
    headerFooter.footer.layoutNode.setAbsoluteSize(null, headerFooter.options.footerSize);
}

function _initSubTree(headerFooter) {
    headerFooter.header.layoutNode = headerFooter.addChild();
    headerFooter.header.layoutNode.setSizeMode(0, 1, 0);
    headerFooter.header.exposedNode = headerFooter.header.layoutNode.addChild();
    headerFooter.body.layoutNode = headerFooter.addChild();
    headerFooter.body.exposedNode = headerFooter.body.layoutNode.addChild();
    headerFooter.footer.layoutNode = headerFooter.addChild();
    headerFooter.footer.layoutNode.setSizeMode(0, 1, 0);
    headerFooter.footer.layoutNode.setAlign(0, 1, 0);
    headerFooter.footer.layoutNode.setMountPoint(0, 1, 0);
    headerFooter.footer.exposedNode = headerFooter.footer.layoutNode.addChild();
}

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
    if (options.headerSize) this.setHeaderSize(options.headerSize);
    if (options.footerSize) this.setFooterSize(options.footerSize);
};

HeaderFooter.prototype.setHeaderSize = function setHeaderSize(headerSize) {
    this.options.headerSize = headerSize;
    _layout(this);
};

HeaderFooter.prototype.setFooterSize = function setHeaderSize(footerSize) {
    this.options.footerSize = footerSize;
    _layout(this);
};

module.exports = HeaderFooter;
