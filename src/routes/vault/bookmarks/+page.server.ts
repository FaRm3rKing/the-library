import type { BookmarksResponse } from "$lib/server/types"

export async function load({ locals }){
    const dbconn = locals.dbconn
    const [res]:[BookmarksResponse[]] = await dbconn.query('SELECT * FROM bookmarks')
    return {
        bookmarks: res
    }
}
