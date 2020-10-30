# switch-editor README

## Features

This plugin allows you to invoke another editor (such as Sublime Text 3) from within vscode. It will open the other editor in exactly the same file, line, and column as in your current vscode text editor window.

### Limitations

So far, only single cursors are supported. This plugin will take the primary cursor location and open the other editor with that.

## Supported Editors

# `subl` - Sublime Text 3
It's required that `subl.exe` (on windows) is locatable via the PATH environment variable. In other words you must be able to start Sublime Text 3 from any command prompt with the `subl` command.

Because the `subl` executable is used to invoke Sublime Text 3, this will always open the last active open window of Sublime Text 3 instead of always creating a new one. A new window is only created if no instance of Sublime Text 3 is running yet.

## Release Notes

### 1.0.0

Initial release of the vscode switch-editor extension.
