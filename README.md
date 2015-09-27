# Javascript Bot Detector

Although the name suggests differently, this is actually a user activity script.
It watches for certain javascript events to guess whether or not the user is
active on the page - and consequently the chance of the "user" actually being a
bot.

## Usage

Just add the script to the page
```
<script src="botDetect.js"></script>
```

Then the recommended way to use it is via the `botDetect.onUser` callback
```
<script>
botDetect.onUser(function () {
    // do something here when user activity is detected
});
</script>
```

You can also access the boolean `botDetect.isUser` and `botDetect.isBot` but
these aren't recommended as user activity may only happen say 30 seconds after
page load.