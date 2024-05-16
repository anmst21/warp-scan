import { cookies } from "next/headers";
import { neynarApi } from "@/axios/neynarApi";
import { formatTimestamp } from "../../utils/format-value";
import Icon from "@/components/icon";
import Image from "next/image";
interface LinkifyTextProps {
  text: string;
}

const LinkifyText: React.FC<LinkifyTextProps> = ({ text }) => {
  const urlRegex = /(https?:\/\/[^\s]+|@[^\s]+)/g;

  const content = text.split(urlRegex).map((part: string, index: number) => {
    if (part.match(/https?:\/\/[^\s]+/)) {
      // This is a URL, create a link
      return (
        <a
          className="text-fuchsia-500 hover:text-fuchsia-600 active:text-fuchsia-700"
          key={index}
          href={part}
          target="_blank"
          rel="noopener noreferrer"
        >
          {part}
        </a>
      );
    } else if (part.match(/@[^\s]+/)) {
      // This is an @ symbol, create a placeholder link
      return (
        <a
          className="text-fuchsia-500 hover:text-fuchsia-600 active:text-fuchsia-700"
          key={index}
          href="#"
        >
          {part}
        </a>
      );
    } else {
      // This is normal text
      return part;
    }
  });

  return <span className="linkified-text">{content}</span>;
};

export default async function Feed() {
  const cookieStore = cookies();
  const fidObject = cookieStore.get("fid");
  const fid = fidObject?.value;
  const {
    data: { casts },
  } = await neynarApi.get("/feed/following", {
    params: { fid, viewer_fid: fid, with_recasts: false, limit: 10 },
  });

  console.log(casts);
  return (
    <div className="mx-4 max-w-md">
      <h1 className="mb-2 text-[64px] font-medium">Feed</h1>
      {casts.map((cast: any) => (
        <div key={cast.hash} className="flex mb-10 w-50 items-start w-full">
          <Image
            src={cast.author.pfp_url}
            alt="User Avatar"
            width={40}
            height={40}
            className="mr-2 rounded-full" // Added rounded-full for circular images
          />
          <div className="gap-3 w-full break-words text-wrap">
            <div className="flex gap-1.5 items-center h-4">
              <span className="font-medium">{cast.author.display_name}</span>
              <span className="mt-[4px]">
                <Icon name="powerBadge" />
              </span>
              <span className="font-regular text-slate-600">
                {"@" + cast.author.username}
              </span>
              <span className="w-1 h-1 bg-slate-600 rounded-full"></span>
              <span className="text-slate-600">
                {formatTimestamp(cast.timestamp)}
              </span>
            </div>
            <LinkifyText text={cast.text} />
          </div>
        </div>
      ))}
    </div>
  );
}
