// Example:
// {
//     "title": "test video title 1",
//     "url": "https://www.youtube.com/watch?v=Aa9ZnlQGw9U",
//     "description": "test",
//     "metadata": ""
// }

export interface YoutubeVideo{
    title? : string
    url? : string
    description?: string
    metadata?: string
}

export interface VideoManager{
    videos: YoutubeVideo[]
    isFetching: boolean
    isSuccessAddedVideo?: boolean
    isFailedAddedVideo?: boolean
}