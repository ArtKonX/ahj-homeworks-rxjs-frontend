export default class SubscriptionOnStream {
  constructor(streamMessages$, messagesList, pollingState) {
    this.streamMessages$ = streamMessages$;
    this.messagesList = messagesList;
    this.pollingState = pollingState;
  }

  getSubscriptionOnStream() {
    const subscriptionOnStream = this.streamMessages$.subscribe((messages) => {
      messages.forEach((element) => {
        this.messagesList.addMess(element);
        this.pollingState.addMess(element);
      });
    });

    return subscriptionOnStream;
  }
}
