import type { BookmarksResponse } from "$lib/server/types"
import { formatDate } from "$lib/utils"
import type { PageServerLoad } from "./$types"

export const load:PageServerLoad = (async ({ locals })=>{
    const dbconn = await locals.dbconn
    const [res]:[BookmarksResponse[]] = await dbconn.query('SELECT * FROM bookmarks')
    // change date format from 
    // Tue Nov 21 2023 05:07:22 GMT+0800 (Philippine Standard Time)
    // to 
    // Nov 21 2023 Tue 05:07
    res.map((data) => {
        data.updated_at = formatDate(data.updated_at)
        data.created_at = formatDate(data.created_at)
    })
    return {
        bookmarks: res
    }
})
