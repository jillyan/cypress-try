const XSRF_TOKEN = {
  key: "XSRF-TOKEN",
  size: 36,
};

const IAM_SESSION = {
  key: "IAMSESSION",
  size: 48,
};
const SESSION = {
  key: "SESSION",
  size: 48,
};

function extractFromCookie(cookie, { key, size }) {
  let value;
  const startIndex = key.length + 1;
  cookie
    .toString()
    .split(", ")
    .forEach((entry) => {
      if (entry.startsWith(`${key}=`)) {
        value = entry.slice(startIndex, startIndex + size);
      }
    });
  return value;
}
function loginByXhr() {
  cy.request({
    method: "GET",
    url: "https://tmc.int.cloud.talend.com/login",
    followRedirect: false,
  }).then((response) => {
    expect(response.status).to.eq(302); // TODO timeout sometimes
    cy.log("response.redirectedToUrl: " + response.redirectedToUrl);
    let headers = response.headers;
    let location = response.redirectedToUrl;
    let setCookie = headers["set-cookie"];
    cy.log(setCookie);
    const csrf1 = extractFromCookie(setCookie, XSRF_TOKEN);
    const session1 = extractFromCookie(setCookie, SESSION);

    //https://iam.int.cloud.talend.com/oidc/idp/authorize?client_id=jJIfLrICihHGmS&redirect_uri=https://tmc.int.cloud.talend.com/login&response_type=code&scope=openid%20refreshToken&state=eddmu4
    cy.request({
      method: "GET",
      url: location,
      followRedirect: false,
    }).then((response) => {
      let location = response.redirectedToUrl;
      let headers = response.headers;
      let setCookie = headers["set-cookie"];

      const xsrfToken = extractFromCookie(setCookie, XSRF_TOKEN);
      const body = {
        method: "POST",
        url: `${location}.do`, //https://iam.int.cloud.talend.com/idp/login
        form: true,
        followRedirect: false,
        body: {
          username: login.username,
          password: login.password,
        },
        headers: {
          cookie: `XSRF-TOKEN=${xsrfToken};IAMSESSION=${extractFromCookie(
            setCookie,
            IAM_SESSION
          )}`,
          "x-xsrf-token": xsrfToken,
        },
        timeout: 100000,
      };
      cy.request(body).then((response) => {
        let location = response.redirectedToUrl;
        cy.request({
          method: "GET",
          url: location,
          headers: {
            cookie: `XSRF-TOKEN=${csrf1};SESSION=${session1}`,
          },
        });
      });
    });
  });
}

export default loginByXhr;