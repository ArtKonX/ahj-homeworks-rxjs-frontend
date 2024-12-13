export default class PollingState {
  constructor() {
    this._pollingStorage = { messages: [] };
  }

  get pollingStorage() {
    return this._pollingStorage;
  }

  init() {
    this.save();
  }

  save() {
    localStorage.setItem("messages", JSON.stringify(this.pollingStorage));
  }

  load() {
    return JSON.parse(localStorage.getItem("messages"));
  }

  del() {
    this.pollingStorage.messages = [];
    this.save();
  }

  addMess(mess) {
    this.pollingStorage.messages = JSON.parse(
      localStorage.getItem("messages"),
    ).messages;
    this.pollingStorage.messages.push(mess);
    this.save();
  }
}
