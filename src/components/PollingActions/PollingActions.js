import Div from "../ui/Div/Div";
import Button from "../ui/Button/Button";

export default class PollingActions {
  constructor(parentEl, pollingState, subscriptionOnStream, subscription) {
    this.parentEl = parentEl;
    this.pollingState = pollingState;
    this.subscriptionOnStream = subscriptionOnStream;
    this.subscription = subscription;
  }

  bindToDOM() {
    this.btnsContainer = new Div({ class: "btns-container" }).element;
    this.btnGoMessages = new Button({
      class: "btn-go-messages",
      type: "button",
      text: "Запустить поток;)",
    }).element;
    this.btnStopeMessages = new Button({
      class: "btn-stop-messages",
      type: "button",
      text: "Остановить поток:|",
    }).element;
    this.btnClearMessages = new Button({
      class: "btn-clear-messages",
      type: "button",
      text: "Очистить все сообщения:(",
    }).element;
    this.btnsContainer.append(
      this.btnGoMessages,
      this.btnStopeMessages,
      this.btnClearMessages,
    );

    this.parentEl.appendChild(this.btnsContainer);

    this.btnsContainer.addEventListener("click", this.eventsBtns.bind(this));
  }

  eventsBtns(e) {
    const listMessages = this.parentEl.querySelector(".list-messages");
    if (e.target.closest(".btn-clear-messages")) {
      this.pollingState.del();
      if ([...listMessages.querySelectorAll(".message-element")].length > 0) {
        [...listMessages.querySelectorAll(".message-element")].forEach(
          (messEl) => {
            messEl.remove();
          },
        );
      }
    }

    if (e.target.closest(".btn-stop-messages")) {
      this.subscription.unsubscribe();
    }

    if (e.target.closest(".btn-go-messages")) {
      this.subscription = this.subscriptionOnStream.getSubscriptionOnStream();
    }
  }
}
