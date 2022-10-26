# podcastWhisperer
## Problem description

Podcast still is an emerging part of modern media. Especially since most media gradually moves towards an on-demand manner of access, podcasts are the logical successor of radio programs. And although big tech companies like Apple and Spotify provide the most important platforms to share and listen to podcasts there is still hardly any social aspect to it. It is not possible to share one's favorites, it is hard to share playlists of episodes connected to a certain subject and it is hard to share additional information, such as transcripts. 

## Solution proposal
A cloud application to search, save and collect favorite podcasts with a functionality to create custom lists together with multiple users and to transcribe episodes either automatically or by uploading transcripts which can then be accessed by other users.

The frontend application will be written using Vue.js while the backend uses MongoDB as a database. Automatic transcriptions are done using openAI's openly available _Whisper_ model in a python service. Information about podcast episodes, search functionality and links to episodes will be fetched from the Taddy Podcast API, which is free to use for small projects.

# License
See the [LICENSE.md](./LICENSE.md) file for license rights and limitations (GNU)
