import ApplicationModel from "../model/ApplicationModel";

class KeyboardManager {
// 9 - Tab
  // 13 - Enter
  // 16-18 - Shift, Ctrl, Alt
  // 20 - CapsLock
  // 27 - Escape
  // 37-40 - arrow keys
  // 91-93 - left WIN, right WIN, popup
  // 112-123 - F1-F12

  // 12 - NumPad 5
  // 32 - Space
  static isNonPrintingCharacter(keyCode: number): boolean {
    if (keyCode === 12) { return false; } // NumPad 5
    if (keyCode === 13) { return false; } // Enter
    if (keyCode === 32) { return false; } // Space
    return (
      (keyCode <= 47)
      || (keyCode >= 91 && keyCode <= 93) // left WIN, right WIN, popup
      || (keyCode >= 112 && keyCode <= 123) // F1-F12 keys
    );
  }

  static handleKeyPress(
    keyCode:number, key:string):void {
    const editTarget = ApplicationModel.getEditTarget()
    console.log('editTarget', editTarget);
    if (editTarget) {
      // console.log('keyTyped', keyCode)
      if (keyCode === 13) {
        ApplicationModel.clearEditTarget();
        // do parameters
      }
      if (
        (keyCode === 13)
        || (keyCode === 8)) {
          // console.log('hit backspace');
          ApplicationModel.backspaceEditTarget();
      }
      if (this.isNonPrintingCharacter(keyCode)) {
        return;
      } else {
        ApplicationModel.addCharacterToEditTarget(key);
      }
    }
  }

}

export default KeyboardManager;