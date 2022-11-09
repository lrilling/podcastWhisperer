# PodcastWhisperer 🎧🗣️
## Problem description

Podcast still is an emerging part of modern media. Especially since most media gradually moves towards an on-demand manner of access, podcasts are the logical successor of radio programs. Therefore it plays an important role in modern news media. Still the problem this medium than brings is that it is fully audio based and transcripts are only rarely created or published by podcast creators. But transcripts of podcasts could be useful for many cases: 
- Access to the medium for people with hearing disabilities
- Full-text search for podcast contents
- Automatic categorization of podcasts from different sources
- learning a language using podcasts is improved if new vocabulary or grammar can be reviewed in a transcript

## Solution proposal
A cloud application to transcribe podcasts and publish transcripts. Users can either use the search functionality to search for podcast episodes or upload mp3-files. In the most simple version the users can collaborate on creating transcriptions. A more elaborate version would use a ASR-model to automatically propose a transcript, which can then be corrected and published. Multiple users can edit transcriptions and propose changes. Once transcribed the content of a podcast is available to the full-text search. This allows users to also use the platform to search for podcast contents. Users can subscribe to podcast series and can activate that transcriptions are automatically created. If multiple users subscribe to the same podcast the transcript is created only once and proposed to all users for review.

## Why in the cloud?
Having this application in the cloud enables different users to access the same podcasts and transcripts and to edit and improve them in collaboration, while the data only has to be stored once. Additionally the automatic transcription using _Whisper_ is so far only available to programers and having it available in a cloud solution makes it usable for many people. The model itself gains with more computational power, which speeds up the usage when executed in more capable servers compared to the execution on consumer processors.

# Tech Stack 📺 💾 📡
The frontend application will be written using **Vue.js** while the backend uses **MongoDB** as a database. Automatic transcript's are done using openAI's openly available **_Whisper_** model in a python service. Information about podcast episodes, search functionality and RSS feed information will be fetched from the **Taddy Podcast API**, which is free to use for small projects.

# License
See the [LICENSE.md](./LICENSE.md) file for license rights and limitations (GNU)
