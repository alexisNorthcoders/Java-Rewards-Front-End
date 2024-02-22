export const validateEmail = (setFn: any, email: string) => {
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

  if (!emailRegex.test(email)) {
    setFn(false);
  } else {
    setFn(true);
  }
};

export const validatePassword = (setFn: any, password: string) => {
  if (password.length < 6) {
    setFn(false);
  } else {
    setFn(true);
  }
};

export const validateAvatarURL = (setFn: any, url: string) => {
  const urlRegex = /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z0-9\u00a1-\uffff][a-z0-9\u00a1-\uffff_-]{0,62})?[a-z0-9\u00a1-\uffff]\.)+(?:[a-z\u00a1-\uffff]{2,}\.?))(?::\d{2,5})?(?:[/?#]\S*)?$/i

  if(!urlRegex.test(url)) {
    setFn(false)
  } else {
    setFn(true)
  }

}

export const validatePostcode = (setFn: any, postcode: string) => {
  const postcodeRegex = /^[a-z]{1,2}\d[a-z\d]?\s*\d[a-z]{2}$/i

  if(!postcodeRegex.test(postcode)) {
    setFn(false)
  } else {
    setFn(true)
  }
}