EMAIL="bimble@bottom.org"
PASSWORD="something"

BASE_URL="http://ttt.wdibos.com/"
URL="${BASE_URL}/users"

JSON="application/json"
# URL="http://httpbin.org/post"

url() {

  CONTENT_TYPE="application/x-www-form-urlencoded"

  curl ${URL} \
  --include \
  --request POST
  --header "Content-Type: ${CONTENT_TYPE}" \
  --data-urlencode "credentials[email]=${EMAIL}" \
  --data-urlencode "credentials[password]=${PASSWORD}"

}

jsonCreate() {

  CONTENT_TYPE="application/json"

  curl "${BASE_URL}/users" \
  --include \
  --request POST \
  --header "Content-Type: ${CONTENT_TYPE}" \
  --data "{
    \"credentials\": {
      \"email\": \"${EMAIL}\",
      \"password\": \"${PASSWORD}\",
      \"password_confirmation\": \"${PASSWORD}\"
    }
  }"

}

jsonLogin() {

  CONTENT_TYPE="application/json"

  curl "${BASE_URL}/login" \
  --include \
  --request POST \
  --header "Content-Type: ${CONTENT_TYPE}" \
  --data "{
    \"credentials\": {
      \"email\": \"${EMAIL}\",
      \"password\": \"${PASSWORD}\"
    }
  }"

}

jsonLogin() {

  CONTENT_TYPE="application/json"

  curl "${BASE_URL}/login" \
  --include \
  --request POST \
  --header "Content-Type: ${CONTENT_TYPE}" \
  --data "{
    \"credentials\": {
      \"email\": \"${EMAIL}\",
      \"password\": \"${PASSWORD}\"
    }
  }"

}

jsonCreateGame() {

  CONTENT_TYPE=${JSON}

  curl "${BASE_URL}/games" \
  --include \
  --request POST \
  --header "Authorization: Token token=e398c76521bc33d7399349294bc55d01" -d '{}'
}

# jsonCreate
# jsonLogin
jsonCreateGame
echo
