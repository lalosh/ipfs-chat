
export async function cidToString({ cid, ipfsNode }: { cid: string, ipfsNode: any }): Promise<string[]> {

    try {

        for await (const file of ipfsNode.get(cid)) {

            if (!file.content) continue;

            const content = []

            for await (const chunk of file.content) {
                content.push(chunk)
            }


            return content.map(chunk => new TextDecoder().decode(chunk));
        }


        return [];

    } catch (error) {
        console.error(error);
        return [];
    }

}


export async function cidToBlobLinks({ cid, ipfsNode }: { cid: string, ipfsNode: any }): Promise<string[]> {

    try {

        for await (const file of ipfsNode.get(cid)) {

            if (!file.content) continue;

            const content = []

            for await (const chunk of file.content) {
                content.push(chunk)
            }

            console.log({ content })

            let blobsResults = content.map(chunk => new Blob([new Uint8Array(chunk).buffer]));
            let blobsLinks = blobsResults.map(blob => window.URL.createObjectURL(blob));


            return blobsLinks
        }

        return [];


    } catch (error) {
        console.error(error);
        return [];
    }

}


export async function addFileContentToIPFS({ path, content, ipfsNode }: { path: string, content: string, ipfsNode: any }) {

    const file = {
        path,
        content,
    }

    return (await ipfsNode.add(file)).cid.toString();
}