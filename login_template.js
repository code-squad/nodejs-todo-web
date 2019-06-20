module.exports = {
  HTML:function(list){
    return `
    <!doctype html>
    <html>
    <head>
      <title>Login</title>
      <meta charset="utf-8">
    </head>
    <body>
        ${list}
    </body>
    </html>
    `;
  }
  
}