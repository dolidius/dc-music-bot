import Play from "./play"

export default class OOO {
    execute = (message, args) => {
        new Play().execute(message, ["https://www.youtube.com/playlist?list=PLknq1kPNZM1PPXJgHZ5-QuiwhxY-Kaw5B"]);
    }
}