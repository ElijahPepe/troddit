import { useMainContext } from "../../MainContext";
import Link from "next/dist/client/link";
import { BiComment } from "react-icons/bi";
import Media from "../Media";
import { secondsToTime } from "../../../lib/utils";
import Image from "next/dist/client/image";
import { useState } from "react";

import { BiExit } from "react-icons/bi";
import { ImReddit } from "react-icons/im";
import { BsCardText } from "react-icons/bs";
import {
  AiOutlineShrink,
  AiOutlineExpandAlt,
  AiOutlineLink,
} from "react-icons/ai";
import TitleFlair from "../TitleFlair";
import Vote from "../Vote";
const Row1 = ({
  post,
  hasMedia,
  hideNSFW,
  score,
  vote,
  castVote,
  forceMute,
}) => {
  const [expand, setexpand] = useState(false);

  return (
    <div className="flex flex-row items-start py-1 text-sm bg-white border-l border-r border-gray-300 shadow-sm dark:bg-[#212121] dark:border-trueGray-700 dark:hover:border-trueGray-500 hover:border-gray-500 hover:shadow-xl ">
      {/* Votes */}
      <div
        className={
          (post?.link_flair_richtext?.length > 0 && "mt-2") +
          " flex flex-row items-center justify-center "
        }
      >
        <div className="flex flex-row items-center justify-center">
          <div className="flex-col items-center self-start justify-start flex-none hidden h-full pt-1 w-14 md:flex">
            <Vote
              likes={post?.likes}
              score={post?.score ?? 0}
              name={post?.name}
            />
          </div>
        </div>
        {/* Thumbnail */}
        <a
          href={
            `${post?.url?.replace("reddit.com", "troddit.com")}` ??
            `https://troddit.com${post?.permalink}`
          }
          target={"_blank"}
          rel="noreferrer"
          onClick={(e) => {
            // e.stopPropagation();
            e.preventDefault();
          }}
        >
          <div
            className={
              "relative flex items-center justify-center flex-none w-24 h-16 mt-2 rounded-md overflow-hidden" +
              (post?.thumbnail == "self" ||
              post?.thumbnail == "default" ||
              post?.thumbnail == "nsfw" ||
              post?.thumbnail == "spoiler"
                ? " border rounded-md"
                : " border border-transparent ") +
              (hideNSFW && " overflow-hidden")
            }
          >
            {post?.thumbnail !== "self" &&
            post?.thumbnail !== "default" &&
            post?.thumbnail &&
            post?.thumbnail !== "nsfw" &&
            post?.thumbnail !== "spoiler" ? (
              <div className={hideNSFW && ""}>
                <Image
                  src={post?.thumbnail}
                  alt=""
                  layout={"intrinsic"}
                  priority={true}
                  height={post?.thumbnail_height}
                  width={post?.thumbnail_width}
                  unoptimized={true}
                  className={"rounded-md " + (hideNSFW && " blur")}
                ></Image>
              </div>
            ) : post?.thumbnail == "self" ? (
              <BsCardText className="w-6 h-6" />
            ) : (
              <AiOutlineLink className="w-6 h-6" />
            )}
          </div>
        </a>
      </div>
      <div className="flex flex-col flex-grow pr-2 mt-2 ml-2">
        {/* Title */}
        <div>
          {post?.link_flair_richtext?.length > 0 && (
            <div className="pb-1 text-xs">
              <TitleFlair post={post} />
              {"  "}
            </div>
          )}
          <h1 className={" text-base leading-none cursor-pointer"}>
            <a
              href={post?.permalink}
              onClick={(e) => e.preventDefault()}
              className={
                post?.distinguished == "moderator" &&
                " text-green-500 dark:text-green-700"
              }
            >
              {`${post?.title}  ` ?? ""}
            </a>
          </h1>
        </div>
        {/* Info */}
        <div className="flex flex-row pt-1 text-xs text-lightBorderHighlight">
          <Link href={`/r/${post?.subreddit}`}>
            <a
              className="mr-1"
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              <h2>r/{post?.subreddit ?? "ERR"}</h2>
            </a>
          </Link>
          <p>•</p>
          <Link href={`/u/${post?.author}`}>
            <a
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              <h2 className="ml-1 mr-1">u/{post?.author ?? ""}</h2>
            </a>
          </Link>
          <p>•</p>

          <p className="ml-1">
            {secondsToTime(post?.created_utc, [
              "s",
              "min",
              "hr",
              "dy",
              "mo",
              "yr",
            ])}
          </p>
          {post?.over_18 && (
            <div className="flex flex-row pl-1 space-x-1">
              <p>•</p>
              <span className="text-red-400 text-color dark:text-red-700">
                NSFW
              </span>
            </div>
          )}
          <span className="ml-4 text-xs font-xs">{`(${post.domain})`}</span>
        </div>
        {/* Links */}
        <div>
          <div className="flex flex-row items-center justify-start pb-1 space-x-1 text-xs select-none text-lightBorderHighlight dark:text-darkBorderHighlight">
            <button
              className={
                "flex flex-row items-center h-6 px-2 space-x-1 border rounded-md border-lightBorder dark:border-darkBorder hover:border-lightBorderHighlight dark:hover:border-darkBorderHighlight " +
                (!hasMedia &&
                  !post?.selftext_html &&
                  "opacity-0 cursor-default")
              }
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                !(!hasMedia && !post?.selftext_html) && setexpand((s) => !s);
              }}
            >
              {hasMedia || post?.selftext_html ? (
                <>{expand ? <AiOutlineShrink /> : <AiOutlineExpandAlt />}</>
              ) : (
                <AiOutlineLink />
              )}
            </button>

            <a href={post?.permalink} onClick={(e) => e.preventDefault()}>
              <button className="flex flex-row items-center px-2 space-x-1 border border-transparent rounded-md hover:border-lightBorderHighlight dark:hover:border-darkBorderHighlight ">
                <BiComment className="flex-none w-6 h-6 md:pr-2 " />
                <h1 className="">{`${post?.num_comments ?? "??"}`}</h1>
                <h1 className="">{`${
                  post?.num_comments === 1 ? "comment" : "comments"
                }`}</h1>
              </button>
            </a>
            <a
              href={`${post?.url}` ?? "https://troddit.com"}
              target="_blank"
              rel="noreferrer"
            >
              <div className="flex flex-row items-center px-2 space-x-1 border border-transparent rounded-md hover:border-lightBorderHighlight dark:hover:border-darkBorderHighlight ">
                <BiExit className="flex-none w-6 h-6 md:pr-2" />
                <h1 className="hidden md:block">Source</h1>
              </div>
            </a>
            <a
              href={`https://www.reddit.com${post?.permalink ?? ""}`}
              target="_blank"
              rel="noreferrer"
            >
              <div className="flex flex-row items-center px-2 space-x-1 border border-transparent rounded-md hover:border-lightBorderHighlight dark:hover:border-darkBorderHighlight ">
                <ImReddit className="flex-none w-6 h-6 md:pr-2" />
                <h1 className="hidden md:block ">Original</h1>
              </div>
            </a>
          </div>
        </div>
        {/* Hidden Media */}
        {expand && (
          <div
            className={
              "block p-1 border-gray-100 md:border-l dark:border-darkHighlight " +
              (hideNSFW && " overflow-hidden relative")
            }
          >
            <a href={post?.permalink} onClick={(e) => e.preventDefault()}>
              <div className={hideNSFW && "blur-3xl"}>
                <Media post={post} imgFull={true} allowIFrame={expand} />
              </div>
            </a>
            {hideNSFW && (
              <div className="absolute flex flex-row justify-center w-full opacity-50 text-lightText top-1/2">
                hidden
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Row1;
