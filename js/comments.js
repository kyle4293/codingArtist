$("#id").click(async function () {
    let doc = {};
    await addDoc(collection(db, "콜렉션이름"), doc);
})