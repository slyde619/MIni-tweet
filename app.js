const app = Vue.createApp({
  data() {
    return {
      tweets: [],
      newTweets: {
        id: 1,
        username: "",
        content: "",
        img: null,
      },
      searchQuery: "",
    };
  },
  methods: {
    // Add tweet and push to tweet array
    addTweet() {
      if (this.tweets !== "") {
        const tweet = {
          id: this.tweets.length + 1,
          username: `@${this.newTweets.username.trim()}`,
          content: this.newTweets.content.trim(),
          img: this.newTweets.img,
        };
        this.tweets.push(tweet);
        this.newTweets.username = "";
        this.newTweets.content = "";
        this.newTweets.img = "";
      }
    },
    deleteTweet(tweetId) {
      console.log(tweetId);
      // Find index of tweet and delete
      const index = this.tweets.findIndex((tweet) => tweet.id === tweetId);
      if (index !== -1) {
        this.tweets.splice(index, 1);
      }
    },
    // Handles file upload
    handleImageUpload(e) {
      const file = e.target.files[0];
      if (file) {
        this.newTweets.img = URL.createObjectURL(file);
      }
    },
    // Format tweet content respect to hashtag
    formatTweetContent(content) {
      const hashtagRegex = /#(\w+)/g;
      return content.replace(hashtagRegex, '<span class="hashtag">#$1</span>');
    },
    // Retweeet original tweet
    retweet(originalTweet) {
      const retweetedContent = `RT ${originalTweet.username}: ${originalTweet.content}`;
      const retweet = {
        id: this.tweets.length + 1,
        username: this.newTweets.username,
        content: retweetedContent,
        img: originalTweet.img,
        retweeted: true, // You can use this flag to style retweets differently.
      };

      this.tweets.push(retweet);
      this.newTweets.username = "";
      this.newTweets.content = "";
      this.newTweets.img = "";
    },
    mounted() {
      try {
        const savedTweets = localStorage.getItem("setTweet");
        if (savedTweets) {
          this.tweets = JSON.parse(savedTweets);
        }
      } catch (error) {
        console.error("Error loading tweeets ", error);
      }
    },
  },

  computed: {
    // searches tweet based on the content or username
    filteredTweets() {
      return this.tweets.filter(
        (tweet) =>
          tweet.username
            .toLowerCase()
            .includes(this.searchQuery.toLowerCase().trim()) ||
          tweet.content
            .toLowerCase()
            .includes(this.searchQuery.toLowerCase().trim())
      );
    },
  },
});

app.mount("#app");
