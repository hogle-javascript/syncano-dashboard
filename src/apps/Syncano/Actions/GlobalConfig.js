export default {
  get() {
    const baseUrl = this.NewLibConnection.baseUrl;
    const instanceName = this.NewLibConnection.getInstanceName();
    const accountKey = this.NewLibConnection.getAccountKey();
    const url = `${baseUrl}/v1.1/instances/${instanceName}/snippets/config/?api_key=${accountKey}`;

    this.Promise.get(url)
      .then(this.completed)
      .catch(this.failure);
  },

  update(config) {
    const baseUrl = this.NewLibConnection.baseUrl;
    const instanceName = this.NewLibConnection.getInstanceName();
    const accountKey = this.NewLibConnection.getAccountKey();
    const url = `${baseUrl}/v1.1/instances/${instanceName}/snippets/config/?api_key=${accountKey}`;

    this.Promise.patch(url, {config})
      .then(this.completed)
      .catch(this.failure);
  }
};
