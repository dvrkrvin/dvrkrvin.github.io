console.log("App loaded");

var submitButton = document.querySelector('#submit-button');
var updateButton = document.querySelector('#update-button');
var loginButton = document.querySelector('#login-button');
var signupButton = document.querySelector('#signup-button');
var registerButton = document.querySelector('#register-button')
var current_id = null;

updateButton.style.display = 'none'


function toggleUpdateButton() {
    var button = document.getElementById('update-button');
    if (button.style.display === "none") {
        button.style.display = "inline-block";
    } else {
        button.style.display = "none";
    }
};

signupButton.onclick = function () {

    var credButtons = document.getElementById('cred-buttons');
    var invalidCreds = document.getElementById('invalid-creds');
    var userExists = document.querySelector("#user-exists");
    signup.style.display = 'inline-block'
    credButtons.style.display = 'none'
    registerButton.style.display = 'inline-block'
    invalidCreds.style.display = 'none'
    userExists.style.display = 'none';

}

registerButton.onclick = function () {

    var fnameInput = document.querySelector('#fname-input');
    var fname = fnameInput.value;

    var lnameInput = document.querySelector('#lname-input');
    var lname = lnameInput.value;
    
    var emailInput = document.querySelector('#email-input');
    var email = emailInput.value;

    var passwordInput = document.querySelector('#password-input');
    var password = passwordInput.value;


    console.log(fname);
    console.log(lname);
    console.log(email);
    console.log(password);

    createUserOnServer(fname, lname, email, password)

    document.querySelector('#fname-input').value = ''
    document.querySelector('#lname-input').value = ''
    document.querySelector('#email-input').value = ''
    document.querySelector('#password-input').value = ''

    var signup = document.getElementById('signup');
    var login = document.getElementById('login');
    var credButtons = document.getElementById('cred-buttons');

    signup.style.display = 'none';
    login.style.display = 'inline-block';
    credButtons.style.display = 'inline-block';

}

loginButton.onclick = function () {

    var email = document.querySelector('#email-input');
    var password = document.querySelector('#password-input');
    var emailValue = email.value;
    var passwordValue = password.value;

    authUserOnServer(emailValue, passwordValue);
    
    //console.log(email.value);
    //console.log(password.value);

}

submitButton.onclick = function () {

    var newMovieInput = document.querySelector('#title-input');
    var movieInputValue = newMovieInput.value;

    var newMovieRatingInput = document.querySelector('#rating-input');
    var movieInputValue_Rating = newMovieRatingInput.value;

    var newMovieGenreInput = document.querySelector('#genre-input');
    var movieInputValue_Genre = newMovieGenreInput.value;

    var newMovieFamilyInput = document.querySelector('#family-input');
    var movieInputValue_Family = newMovieFamilyInput.value;

    var newMovieAgainInput = document.querySelector('#again-input');
    var movieInputValue_Again = newMovieAgainInput.value;

    console.log(movieInputValue);
    console.log(movieInputValue_Rating);
    console.log(movieInputValue_Genre);
    console.log(movieInputValue_Family);
    console.log(movieInputValue_Again);

    createMovieOnServer(movieInputValue, movieInputValue_Rating, movieInputValue_Genre, movieInputValue_Family, movieInputValue_Again);
    
    document.querySelector('#title-input').value = ''
    document.querySelector('#rating-input').value = ''
    document.querySelector('#genre-input').value = ''
    document.querySelector('#family-input').value = ''
    document.querySelector('#again-input').value = ''
    
    // var rigNumberList = document.querySelector('#rig-number-list');
    // var rigNumberResult = document.createElement('li');
    // rigNumberList.appendChild(rigNumberResult);

};

updateButton.onclick = function () {

    var newMovieInput = document.querySelector('#title-input');
    var movieInputValue = newMovieInput.value;

    var newMovieRatingInput = document.querySelector('#rating-input');
    var movieInputValue_Rating = newMovieRatingInput.value;

    var newMovieGenreInput = document.querySelector('#genre-input');
    var movieInputValue_Genre = newMovieGenreInput.value;

    var newMovieFamilyInput = document.querySelector('#family-input');
    var movieInputValue_Family = newMovieFamilyInput.value;

    var newMovieAgainInput = document.querySelector('#again-input');
    var movieInputValue_Again = newMovieAgainInput.value;

    console.log(movieInputValue);
    console.log(movieInputValue_Rating);
    console.log(movieInputValue_Genre);
    console.log(movieInputValue_Family);
    console.log(movieInputValue_Again);

    editMovieFromServer(movieInputValue, movieInputValue_Rating, movieInputValue_Genre, movieInputValue_Family, movieInputValue_Again, current_id);

    document.querySelector('#title-input').value = ''
    document.querySelector('#rating-input').value = ''
    document.querySelector('#genre-input').value = ''
    document.querySelector('#family-input').value = ''
    document.querySelector('#again-input').value = ''

    toggleUpdateButton();

};

function createUserOnServer(fname, lname, email, password) {
    var data = 'fname=' + encodeURIComponent(fname) + '&lname=' + encodeURIComponent(lname) + '&email=' + encodeURIComponent(email) + '&password=' + encodeURIComponent(password);
    
    fetch('https://agile-bastion-53207.herokuapp.com/users', {
        // request options here
        // method, header(s), body
        method: 'POST',
        credentials: 'include',
        body: data,
        headers: {
            //headers go here, key/value pairs
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    }).then(function (response) {
        if (response.status == 422) {
            // User already exists
            console.log('User already exists')
            var userExists = document.querySelector("#user-exists");
            userExists.style.display = 'inline-block';
            return;
        } else if (response.status == 201) {
            // show resource list/divs
            console.log('User created succesfully');
            accountCreated = document.querySelector('#account-created');
            accountCreated.style.display = 'inline-block';
        }
        loadMoviesFromServer();
    });

}

function authUserOnServer(email, password) {
    console.log("working?")
    var data = 'email=' + encodeURIComponent(email) + '&password=' + encodeURIComponent(password);
    
    fetch('https://agile-bastion-53207.herokuapp.com/sessions', {
        // request options here
        // method, header(s), body
        method: 'POST',
        credentials: 'include',
        body: data,
        headers: {
            //headers go here, key/value pairs
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    }).then(function (response) {
        if (response.status == 401) {
            // User already exists
            console.log('Incorrect email or password')
            
            invalidCreds = document.querySelector("#invalid-creds");
            invalidCreds.style.display = 'inline-block';
            return;
        }
        loadMoviesFromServer();
    });

}

function createMovieOnServer(movieName, movieRating, movieGenre, movieFamily, movieAgain) {
    var data = 'name=' + encodeURIComponent(movieName) + '&rating=' + encodeURIComponent(movieRating) + '&genre=' + encodeURIComponent(movieGenre) + "&family=" + encodeURIComponent(movieFamily) + "&again=" + encodeURIComponent(movieAgain);

    fetch('https://agile-bastion-53207.herokuapp.com/movies', {
        // request options here
        // method, header(s), body
        method: 'POST',
        credentials: 'include',
        body: data,
        headers: {
            //headers go here, key/value pairs
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    }).then(function (response) {
        //request code goes here
        loadMoviesFromServer();
    });
}

function deleteMovieFromServer(movieId) {
    fetch(`https://agile-bastion-53207.herokuapp.com/movies/${movieId}`, {
        method: 'DELETE',
        credentials: 'include'
    }).then(function (response) {
        loadMoviesFromServer();
    })
}

function editMovieFromServer(movieName, movieRating, movieGenre, movieFamily, movieAgain, movieId) {
    
    var data = 'name=' + encodeURIComponent(movieName) + '&rating=' + encodeURIComponent(movieRating) + '&genre=' + encodeURIComponent(movieGenre) + "&family=" + encodeURIComponent(movieFamily) + "&again=" + encodeURIComponent(movieAgain);
    fetch(`https://agile-bastion-53207.herokuapp.com/movies/${movieId}`, {
        method: 'PUT',
        credentials: 'include',
        body: data,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    }).then(function (response) {
        loadMoviesFromServer();
    })
}

function loadMoviesFromServer() {
    fetch('https://agile-bastion-53207.herokuapp.com/movies', {
        credentials: 'include'
    }).then(function (response) {
        var login = document.querySelector('#login');
        var resources = document.querySelector('#logged-in')
        if (response.status == 401) {
            // show login/register divs
            login.style.display = 'inline-block'

            // hide resource list/divs/etc.
            resources.style.display = 'none'

            return;
        } else if (response.status == 200) {
            // show resource list/divs
            resources.style.display = 'inline-block'
            
            // hide login/register data
            login.style.display = 'none'
        }

        response.json().then(function (dataFromServer) {
            MOVIES = dataFromServer;

            var movieList = document.querySelector('#movie-list');
            movieList.innerHTML = '';

            //for word in HELLO
            MOVIES.forEach(function (movie) {

                var movieItem = document.createElement('li');
                // movieItem.innerHTML = movie.name + movie.rating;

                var nameDiv = document.createElement('div');
                nameDiv.innerHTML = "Movie Title: " + movie.name;
                nameDiv.classList.add('movie-name'); // movie-name is now class for CSS
                movieItem.appendChild(nameDiv);

                var ratingDiv = document.createElement('div');
                ratingDiv.innerHTML = "Rating: " + movie.rating;
                ratingDiv.classList.add('movie-rating'); // movie-rating is now class for CSS
                movieItem.appendChild(ratingDiv);

                var genreDiv = document.createElement('div');
                genreDiv.innerHTML = "Genre: " + movie.genre;
                genreDiv.classList.add('movie-genre'); // movie genre is now class for CSS
                movieItem.appendChild(genreDiv);

                var familyDiv = document.createElement('div');
                familyDiv.innerHTML = "Family-Friendly? " + movie.family;
                familyDiv.classList.add('movie-family'); // movie genre is now class for CSS
                movieItem.appendChild(familyDiv);

                var againDiv = document.createElement('div');
                againDiv.innerHTML = "Watch Again? " + movie.again;
                againDiv.classList.add('movie-again'); // movie again is now class for CSS
                movieItem.appendChild(againDiv);

                var deleteButton = document.createElement('button');
                deleteButton.id = 'delete-button'
                deleteButton.innerHTML = "Delete";
                deleteButton.onclick = function () {
                    confirmation = confirm("Are you sure you want to delete this entry?")
                    if (confirmation == true) {
                        console.log('please delete this', movie.id);
                        deleteMovieFromServer(movie.id)
                    }}
                    // call new function deleteMovieFromServer
                    // pass movie.id to this function for context
                    
                var editButton = document.createElement('button');
                editButton.id = 'edit-button'
                editButton.innerHTML = "Edit";
                editButton.onclick = function () {
                    console.log('please edit this', movie.id);
                    document.querySelector('#title-input').value = movie.name
                    document.querySelector('#rating-input').value = movie.rating
                    document.querySelector('#genre-input').value = movie.genre
                    document.querySelector('#family-input').value = movie.family
                    document.querySelector('#again-input').value = movie.again
                    toggleUpdateButton()
                    current_id = movie.id
                };


                movieItem.appendChild(editButton);
                movieItem.appendChild(deleteButton);
                movieList.appendChild(movieItem);

                
            });
        });
    });
}

loadMoviesFromServer();