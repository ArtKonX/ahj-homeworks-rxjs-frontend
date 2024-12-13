import Div from "../ui/Div/Div";
import Li from "../ui/Li/Li";
import Paragraph from "../ui/Paragraph/Paragraph";
import Time from "../ui/Time/Time";

import clipSubject from "../../utils/clipSubject";
import Ul from "../ui/Ul/Ul";

export default class MessagesList {
  constructor(parentEl, data) {
    this.parentEl = parentEl;
    this.data = data;
  }

  bindToDOM() {
    this.listMessages = new Ul({ class: "list-messages" }).element;

    this.parentEl.appendChild(this.listMessages);

    if (this.data.length > 0) {
      this.data.forEach((mess) => {
        this.addMess(mess);
      });
    }
  }

  addMess(data) {
    const messageElement = new Li({ class: "message-element" }).element;
    const messageEmail = new Paragraph({
      class: "message-email",
      text: data.from,
    }).element;
    const messageText = new Paragraph({
      class: "message-text",
      text: clipSubject(data.subject, 15),
    }).element;
    const messageTextFull = new Paragraph({
      class: ["message-text-full", "message-text-full_hidden"],
      text: data.body,
    }).element;
    const messageTime = new Time({
      class: "message-time",
      dateCreated: data.received,
    }).element;
    const messageDemoContainer = new Div({ class: "message-demo-container" })
      .element;
    messageDemoContainer.append(messageEmail, messageText, messageTime);
    messageElement.append(messageDemoContainer, messageTextFull);

    this.listMessages.appendChild(messageElement);

    if (
      [...this.listMessages.querySelectorAll(".message-element")].length > 1
    ) {
      messageElement.style.borderTop = "none";
    }
  }
}
