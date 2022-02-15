import { computePosition, flip, shift, offset, arrow } from '@floating-ui/dom';

const DIALOG_TEMPLATE = '<div class="are-you-sure"><div class="ays-arrow"></div><div class="ays-question"></div><div class="ays-actions"></div></div>';
const DefaultConfig = {
  question: 'Are you sure?',
  placement: 'top',
  buttons: [
    {
      label: 'Yes',
      onClick: 'confirm',
      classes: 'ays-yes'
    },
    {
      label: 'No',
      onClick: 'cancel',
      classes: 'ays-no'
    }
  ],
  onClick: null,
  onConfirm: null,
  onDismiss: null,
  style: "default"
};

const Styles = {
  default: {},
  bootstrap: {
    ".are-you-sure": ["bg-light", "border", "p-2"],
    ".ays-arrow": ["bg-light", "border-start", "border-top"],
    ".ays-actions": ["d-flex", "justify-content-end", "mt-2"],
    ".ays-yes": ["btn", "btn-sm", "btn-success"],
    ".ays-no": ["btn", "btn-sm", "btn-danger", "ms-1"]
  },
  bulma: {
    ".are-you-sure": ["has-background-grey-lighter", "border", "border-dark", "p-2"],
    ".ays-arrow": ["has-background-grey-lighter", "border-start", "border-top", "border-dark"],
    ".ays-question": ["lead"],
    ".ays-actions": ["d-flex", "justify-content-end", "mt-2"],
    ".ays-yes": ["button", "is-success", "is-small"],
    ".ays-no": ["button", "is-danger", "is-small", "ml-1"]
  }
};

export class Confirmation {
  constructor(button, config) {
    this._button = button;

    // Merge and validate configuration
    this._config = { ...DefaultConfig, ...(typeof config === 'object' ? config : {}) };
    this._validateConfig();

    // Add the magic to the trigger button
    this._initializeButton();
  }

  _initializeButton() {
    this._button.addEventListener("click", event => {
      // Only one confirmation popup per instance / button
      if (this._dialog) {
        return;
      }

      this._addConfirmationDialog();
      let arrowElement = this._dialog.querySelector(".ays-arrow");

      computePosition(this._button, this._dialog, {
        placement: this._config.placement,
        middleware: [offset(6), flip(), shift({ padding: 5 }), arrow({ element: arrowElement })],
      }).then(({ x, y, placement, middlewareData }) => {
        Object.assign(this._dialog.style, {
          left: `${x}px`,
          top: `${y}px`,
        });

        const { x: arrowX, y: arrowY } = middlewareData.arrow;
        const staticSide = {
          top: 'bottom',
          right: 'left',
          bottom: 'top',
          left: 'right',
        }[placement.split('-')[0]];

        Object.assign(arrowElement.style, {
          left: arrowX != null ? `${arrowX}px` : '',
          top: arrowY != null ? `${arrowY}px` : '',
          right: '',
          bottom: '',
          [staticSide]: '-4px',
        });
      });

      // Call onClick-Callback
      if (this._config.onClick && typeof this._config.onClick === 'function') {
        this._config.onClick.apply(this._dialog);
      }
    });
  }

  _validateConfig() {
    // Style must be known
    if (!Styles[this._config.style]) {
      let allowedStyles = Object.keys(Styles).join(", ");
      throw `Style ${this._config.style} is unknown. Allowed styles are: ${allowedStyles}`;
    }
  }

  _addConfirmationDialog() {
    let body = document.getElementsByTagName("body")[0];
    let dialog = document.createElement("div");
    body.appendChild(dialog);
    dialog.outerHTML = DIALOG_TEMPLATE;

    // Variable must be reassigned after change of outerHTML
    dialog = body.getElementsByClassName("are-you-sure")[0];
    this._dialog = dialog;

    // Set Question
    dialog.querySelector(".ays-question").textContent = this._config.question;

    // Add buttons
    let buttonContainer = dialog.querySelector(".ays-actions");

    for (let button of this._config.buttons) {
      let buttonDOM = document.createElement("button");
      buttonDOM.setAttribute("type", "button");
      buttonDOM.classList.add(button.classes);
      buttonDOM.textContent = button.label;

      if (typeof button.onClick === 'function') {
        buttonDOM.addEventListener("click", button.onClick);
      } else {
        buttonDOM.addEventListener("click", () => this._handleConfirmOrDismissClick.apply(this, [button.onClick]));
      }

      buttonContainer.appendChild(buttonDOM);
    }

    // Apply styling
    this._applyStyle();
  }

  _applyStyle() {
    let styleChanges = Styles[this._config.style];

    for (let defaultClass in styleChanges) {
      let target = defaultClass === ".are-you-sure"
        ? this._dialog
        : this._dialog.querySelector(defaultClass);

      target.classList.add(...styleChanges[defaultClass]);
    }
  }

  _handleConfirmOrDismissClick(type) {
    // Call the callback
    let callback = type === 'confirm' ? this._config.onConfirm : this._config.onDismiss;

    if (callback && typeof callback === 'function') {
      let callbackResult = callback.apply(this._dialog);

      // Don't hide the dialog if callback returns something
      if (callbackResult !== undefined) {
        return;
      }
    }

    // Remove dialog
    this._dialog.remove();
    this._dialog = null;
  }
}