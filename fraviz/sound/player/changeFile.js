let musicPaths = [
    {
        name: "Du sale",
        path: "../../music/du_sale.mp3",
    },
    {
        name: "Cash",
        path: "../../music/cash.mp3",
    },
    {
        name: "Human activity",
        path: "../../music/human_activity.mp3",
    },
    {
        name: "Omen",
        path: "../../music/omen.mp3",
    },
    {
        name: "Second waltz",
        path: "../../music/second_waltz.mp3",
    },
    {
        name: "Sun king",
        path: "../../music/sun_king.mp3",
    },
    {
        name: "Toi",
        path: "../../music/toi.mp3",
    },
    {
        name: "Ton Chemin",
        path: "../../music/ton_chemin.mp3",
    },
    {
        name: "Sweet Dreams",
        path: "../../music/sweet_dreams.mp3",
    },
]

musicPaths.forEach(element => {
    var o = new Option(element.name, element.path);
    $(o).html(element.name);
    $("#songSelect").append(o);
});