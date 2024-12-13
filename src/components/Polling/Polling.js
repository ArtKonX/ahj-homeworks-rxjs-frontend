import Div from "../ui/Div/Div";
import Heading from "../ui/Heading/Heading";

export default class Polling {
  constructor(
    streamMessages$,
    parentEl,
    pollingState,
    messagesList,
    subscriptionOnStream,
    pollingActions,
  ) {
    this.streamMessages$ = streamMessages$;
    this.parentEl = parentEl;
    this.pollingState = pollingState;
    this.messagesList = messagesList;
    this.subscriptionOnStream = subscriptionOnStream;
    this.pollingActions = pollingActions;
  }

  bindToDOM() {
    this.container = new Div({ class: "container" }).element;
    this.title = new Heading({
      class: "title",
      level: "1",
      text: "Incoming",
    }).element;

    this.parentEl.appendChild(this.container);
    this.container.append(this.title);

    this.pollingState = new this.pollingState();
    this.loadedMessages = this.pollingState.load().messages;

    this.messagesList = new this.messagesList(
      this.container,
      this.loadedMessages,
    );

    this.subscriptionOnStream = new this.subscriptionOnStream(
      this.streamMessages$,
      this.messagesList,
      this.pollingState,
    );
    this.subscription = this.subscriptionOnStream.getSubscriptionOnStream();

    this.pollingActions = new this.pollingActions(
      this.container,
      this.pollingState,
      this.subscriptionOnStream,
      this.subscription,
    );

    this.pollingActions.bindToDOM();
    this.messagesList.bindToDOM();

    const listMessages = this.container.querySelector(".list-messages");

    listMessages.addEventListener("click", this.toggleMessage.bind(this));
  }

  toggleMessage(e) {
    if (e.target.closest(".message-element")) {
      e.target
        .closest(".message-element")
        .querySelector(".message-text-full")
        .classList.toggle("message-text-full_hidden");
    }
  }
}
