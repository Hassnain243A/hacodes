const firebaseConfig = {
    databaseURL: "https://yt-project-a29f8-default-rtdb.asia-southeast1.firebasedatabase.app"
}
firebase.initializeApp(firebaseConfig)
const database = firebase.database()
// send data
var listRef = database.ref('messages/')
var newRef = listRef.push()
newRef.set({
    'name': name.value,
    'email': email.value,
    'message': message.value
})
// fetch data
var fetchedData = database.ref('messages/')
fetchedData.on('value', (snapshot) => {
    var data = snapshot.val()
    for (var key in data) {
        var value = data[key]
        // value is an object, get data as you want
        console.log(value.name);
        // you can also use object keys
        console.log(key);
    }
})
// for deleting complete row
database.ref('messages/' + 'row-id-here').remove()
// for deleting single property
database.ref('messages/-NGXY8oB6DS9YmykTGrO/'+ 'email').remove()
// for updating property
var obj = {
    'name': 'new-content',
    'email': 'new-content',
    'message': 'new-content'
}
var listRef = database.ref('messages/' + 'row-id-here')
listRef.update(obj)

