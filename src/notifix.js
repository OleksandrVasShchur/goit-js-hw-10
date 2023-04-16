
export function messageToMutchCountryes(){
    Notiflix.Notify.info("Too many matches found. Please enter a more specific name.");
}

export function messageWrongError() {
    Notiflix.Notify.failure("Oops, there is no country with that name.");
}
