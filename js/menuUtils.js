MenuUtils = function () {

    var items = {};

    /*
     * Building trees from flat structure.
     * Method returns root elements of the trees.
     */
    this.buildTrees = function (elements) {
        var roots = [];
        //moving elements to hash table for future quick search
        elements.forEach(function (entry) {
            items[entry.id] = entry;
        });
        var parent;
        var node;
        for (var id in items) {
            if (items.hasOwnProperty(id)) {
                node = items[id];
                if (node.parentId != null) {
                    parent = items[node.parentId];
                    node.parent = parent;
                    if (!parent.hasOwnProperty("children")) {
                        parent.children = [];
                    }
                    parent.children.push(node);
                } else {
                    /*if there's no parent, then this is a root element*/
                    roots.push(node);

                }
            }
        }
        //root menu elements
        return roots;
    }

    /*
    * Recursive algorithm to calculate the root of the given element.
    * To reduce future calculations it saves root id in "root" property for every node it meets on it way to root.
    */
    this.getRoot = function (nodeId) {
        var node = items[nodeId];
        if (node == null) {
            return null;
        }
        if (node.hasOwnProperty("root")) {
            return node.root;
        }
        if (node.parentId == null) {
            return node.root = node.id;
        }
        return node.root = this.getRoot(node.parentId);
    }

    /*
    * Returns array of nodes from root to node with given id
    */
    this.getPathToRoot = function (nodeId) {
        var node = items[nodeId];
        if (node != null) {
            var pathToRoot = [node];
            while (node.parent != null) {
                node = node.parent
                pathToRoot.push(node);
            }
            return pathToRoot.reverse();
        }
    }

}