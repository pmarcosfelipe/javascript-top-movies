class MoviesAnalyzer {
  constructor(movies, users) {
    this.movies = movies;
    this.users = users;
  }

  topWatchlistedMoviesAmongFriends(userId) {
    const friendsByUserId = this.users.find((user) => user.userId === userId);

    const watchlistMovies = [];
    const friendsIds = friendsByUserId.friends;
    friendsIds.map((friendId) => {
      this.movies.map((movie) => {
        if (movie.watchlist.includes(friendId))
          watchlistMovies.push(movie.title);
      });
    });

    const normalizedWatchlistMovies = [];
    watchlistMovies.map((watchlistMovie) => {
      const normObj = {};
      normObj['count'] = 1;
      normObj['name'] = watchlistMovie;

      normalizedWatchlistMovies.push(normObj);
    });

    const reducedWatchListMovies = normalizedWatchlistMovies.reduce((a, b) => {
      a[b.name] = (a[b.name] || 0) + b.count;
      return a;
    }, {});

    const reducedWatchListMoviesArray = Object.keys(reducedWatchListMovies).map(
      (key) => {
        return [key, reducedWatchListMovies[key]];
      }
    );

    const newArrayOrdered = reducedWatchListMoviesArray.sort((a, b) => {
      let paramA = a[1];
      let paramB = b[1];

      if (paramA > paramB) {
        return -1;
      } else if (paramA < paramB) {
        return 1;
      } else if (paramA === paramB) {
        if (a[0] < b[0]) {
          return -1;
        } else if (a[0] > b[0]) {
          return 1;
        } else {
          return 0;
        }
      }
    });

    function returnFourMost(newArrayOrdered) {
      const fourMostWatched = [];
      if (newArrayOrdered.length >= 4) {
        fourMostWatched.push(newArrayOrdered[0]);
        fourMostWatched.push(newArrayOrdered[1]);
        fourMostWatched.push(newArrayOrdered[2]);
        fourMostWatched.push(newArrayOrdered[3]);
      }
      return fourMostWatched;
    }

    const fourMostWatched = returnFourMost(newArrayOrdered).map(
      (film) => film[0]
    );

    return fourMostWatched;
  }
}

module.exports = { MoviesAnalyzer };
