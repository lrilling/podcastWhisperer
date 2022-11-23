import uuid from "uuid";
import Transcript from "./transcript";

class Episode {
    constructor(id, name, series, file, transcript = null) {
        this.id = id;
        this.name = name;
        this.series = series;
        this.file = file;
        this.transcript = transcript

        this.series.addEpisode(this);
    }

    createTranscript() {
        if (this.transcript != null) {
            this.transcript = new Transcript(uuid(), this.id)
        }
    }
}

export default Episode
