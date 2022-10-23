import { useEffect } from 'react';

const commentNodeId = 'comments';

interface CommentsProps {
  postSlug: string;
}

export default function Comments({ postSlug }: CommentsProps) {
  useEffect(() => {
    const script = document.createElement('script')
    script.src = 'https://utteranc.es/client.js'
    script.async = true
    script.setAttribute('repo', 'TalissonOliveira/spacetraveling')
    script.setAttribute('issue-term', 'pathname')
    script.setAttribute('label', 'comments :speech_balloon:')
    script.setAttribute('theme', 'dark-blue')
    script.setAttribute('crossorigin', 'anonymous')

    const scriptParentNode = document.getElementById(commentNodeId)
    scriptParentNode.appendChild(script)

    return () => {
      scriptParentNode.removeChild(scriptParentNode.firstChild)
    }
  }, [postSlug])

  return <div id={commentNodeId} />
}
