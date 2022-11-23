class Transcript {
    constructor(id, episodeId, file) {
        this.id = id;
        this.episodeId = episodeId;
        this.file = new File([], `${this.id}.txt`);
    }
}