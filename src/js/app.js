import API_ROOT from "../environment/environment";

import Polling from "../components/Polling/Polling";
import PollingState from "../classes/PollingState";
import StreamMessages from "../classes/StreamMessages";
import MessagesList from "../components/MessagesList/MessagesList";
import SubscriptionOnStream from "../classes/SubscriptionOnStream";
import PollingActions from "../components/PollingActions/PollingActions";

const url = `${API_ROOT}/messages/unread`;

document.addEventListener("DOMContentLoaded", () => {
  const app = document.querySelector("#app");

  const streamMessages$ = new StreamMessages(url).updateStreamMessages();

  const polling = new Polling(
    streamMessages$,
    app,
    PollingState,
    MessagesList,
    SubscriptionOnStream,
    PollingActions,
  );

  polling.bindToDOM();
});
