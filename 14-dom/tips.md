# Chapter 14 - Document Object Model Exercises Tips

## 1. Build a Table

You can use `document.createElement` to create new element nodes, `document.createTextNode` to create text nodes, and the `appendChild` method to put nodes into other nodes.

You’ll want to loop over the key names once to fill in the top row and then again for each object in the array to construct the data rows. To get an array of key names from the first object, `Object.keys` will be useful.

To add the table to the correct parent node, you can use `document.getElementById` or `document.querySelector` with `"#mountains"` to find the node.

## 2. Elements by Tag Name

The solution is most easily expressed with a recursive function, similar to the `talksAbout` function defined [earlier in this chapter](https://eloquentjavascript.net/14_dom.html#talksAbout).

You could call `byTagname` itself recursively, concatenating the resulting arrays to produce the output. Or you could create an inner function that calls itself recursively and that has access to an array binding defined in the outer function, to which it can add the matching elements it finds. Don’t forget to call the inner function once from the outer function to start the process.

The recursive function must check the node type. Here we are interested only in node type 1 (`Node.ELEMENT_NODE`). For such nodes, we must loop over their children and, for each child, see whether the child matches the query while also doing a recursive call on it to inspect its own children.

## 3. The Cat's Hat

`Math.cos` and `Math.sin` measure angles in radians, where a full circle is $2π$. For a given angle, you can get the opposite angle by adding half of this, which is `Math.PI`. This can be useful for putting the hat on the opposite side of the orbit.