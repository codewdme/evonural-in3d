"use client";
import React, { FormEvent, FormEventHandler, useState } from "react";
import { BsDownload as DownloadIcon } from "react-icons/bs";
import { HeartIcon } from "@heroicons/react/24/outline";
import { CiShare2 as ShareIcon } from "react-icons/ci";
import { FormData } from "@/types/types";
import { ChevronDownIcon } from "@heroicons/react/16/solid";
import { Field, Label, Switch } from "@headlessui/react";
import axios from "axios";

function PromptForm() {
  const options: string[] = ["Create", "Remix", "Edit", "3D"];
  const renderModels = [
    "M3 Detailed Render",
    "M3 Magic Render",
    "M3 Magic Realism",
    "M3 Utopian Render",
    "M3 Dystopian Render",
    "M3 UHD Render",
    "M3 Sky Dome",
  ];
  const [selectedOption, setSelectedOption] = useState<string>(options[0]);
  const [formData, setFormData] = useState<FormData>({
    queryType: selectedOption,
    prompt:
      "A picturesque hilltop village, flawless houses perched overlooking a vast expanse, ancient stone tower, embraced by swirling cumulus nimbus clouds akin to rolling hills and amber mountains, basking in the warm glow of the golden hour.",
    negativeText: false,
    enhancePrompt: false,
    selectedRenderModel: renderModels[0],
  });

  const [loading, setLoading] = useState(false);
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:5002/api/skybox/generateSkybox",
        {
          prompt,
          skybox_style_id: formData.prompt,
        }
      );
      console.log(response);
    } catch (e) {
      console.log(e);
    }

    console.log("submit");
    setLoading(false);
  };
  return (
    <section className="fixed z-30 bottom-0 left-0   p-2  w-full   ">
      <div className="w-full bg-black/50 rounded-md flex flex-col justify-center items-center max-w-5xl mx-auto">
        <Options
          selected={selectedOption}
          setSelected={setSelectedOption}
          options={options}
        />
        <MainForm
          handleSubmit={handleSubmit}
          data={formData}
          setData={setFormData}
          loading={loading}
          models={renderModels}
        />
      </div>
    </section>
  );
}

export default PromptForm;

const Options = ({
  selected,
  setSelected,
  options,
}: {
  options: string[];
  selected: string;
  setSelected: React.Dispatch<React.SetStateAction<string>>;
}) => {
  return (
    <div className="min-w-full px-8">
      <div className="flex flex-col lg:flex-row gap-8 xl:gap-0 xl:h-16 justify-between">
        <div className="flex px-2 pt-4 xl:pt-0 lg:px-0">
          <div className=" flex space-x-8 ">
            {/* Current: "border-[#13EE8B] text-gray-900", Default: "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700" */}
            {options.map((option: string) => (
              <button
                key={option}
                onClick={() => {
                  setSelected(option);
                }}
                className={`inline-flex items-center border-b-[1px] ${
                  selected === option
                    ? "border-[#13EE8B]"
                    : "border-transparent"
                } hover:border-[#13EE8B] hover:text-[#13EE8B] px-1 pt-1 text-sm font-medium ${
                  selected === option ? "text-[#13EE8B]" : "text-white"
                } simpleTransition`}
              >
                {option}
              </button>
            ))}
          </div>
        </div>

        <div className="hidden ml-4 xl:flex items-center gap-6 ">
          <button
            type="button"
            className="relative shrink-0 rounded-full   text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-[#13EE8B] focus:ring-offset-2"
          >
            <span className="absolute -inset-1.5" />
            <span className="sr-only">View notifications</span>
            <HeartIcon aria-hidden="true" className="size-6  text-white" />
          </button>
          <button
            type="button"
            className="relative shrink-0 rounded-full   text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-[#13EE8B] focus:ring-offset-2"
          >
            <span className="absolute -inset-1.5" />
            <span className="sr-only">Download</span>
            <DownloadIcon aria-hidden="true" className="size-5  text-white" />
          </button>
          <button
            type="button"
            className="relative shrink-0 rounded-full   text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-[#13EE8B] focus:ring-offset-2"
          >
            <span className="absolute -inset-1.5" />
            <span className="sr-only">Download</span>
            <ShareIcon aria-hidden="true" className="size-5  text-white" />
          </button>
        </div>
      </div>
    </div>
  );
};

const MainForm = ({
  handleSubmit,
  data,
  setData,
  loading,
  models,
}: {
  data: FormData;
  loading: boolean;
  models: string[];
  setData: React.Dispatch<React.SetStateAction<FormData>>;
  handleSubmit: FormEventHandler<HTMLFormElement>;
}) => {
  return (
    <form className="w-full p-3 px-4 xl:px-8 xl:p-4" onSubmit={handleSubmit}>
      <div className="w-full">
        <div className="grid grid-cols-1  gap-y-4 ">
          <div className="flex justify-center xl:justify-between items-center ">
            <div className="min-w-[85%] xl:min-w-full">
              <label
                htmlFor="prompt"
                className="block text-sm/6 font-semibold text-white"
              >
                Prompt
              </label>
              <div className="mt-1">
                <textarea
                  id="prompt"
                  name="prompt"
                  rows={4}
                  className="block min-w-full rounded-md bg-transparent backdrop-blur-8  px-3.5 py-2 text-base text-white outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-[#13EE8B]"
                  defaultValue={data.prompt}
                  onChange={(e) => {
                    setData({ ...data, prompt: e.target.value });
                  }}
                />
              </div>
            </div>
            <div className=" xl:hidden ml-4 flex flex-col items-center gap-5 mt-6 ">
              <button
                type="button"
                className="relative shrink-0 rounded-full   text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-[#13EE8B] focus:ring-offset-2"
              >
                <span className="absolute -inset-1.5" />
                <span className="sr-only">View notifications</span>
                <HeartIcon aria-hidden="true" className="size-5  text-white" />
              </button>
              <button
                type="button"
                className="relative shrink-0 rounded-full   text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-[#13EE8B] focus:ring-offset-2"
              >
                <span className="absolute -inset-1.5" />
                <span className="sr-only">Download</span>
                <DownloadIcon
                  aria-hidden="true"
                  className="size-5  text-white"
                />
              </button>
              <button
                type="button"
                className="relative shrink-0 rounded-full   text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-[#13EE8B] focus:ring-offset-2"
              >
                <span className="absolute -inset-1.5" />
                <span className="sr-only">Download</span>
                <ShareIcon aria-hidden="true" className="size-5  text-white" />
              </button>
            </div>
          </div>
          <div className="flex flex-col xl:flex-row justify-start xl:justify-between items-center">
            <div className="pb-3 xl:py-0 flex justify-start xl:justify-between items-center gap-4">
              <Field className="flex justify-center items-center gap-x-1 xl:gap-x-4 sm:col-span-2">
                <div className="flex h-6 items-center">
                  <Switch
                    checked={data.negativeText}
                    onChange={() => {
                      setData({
                        ...data,
                        negativeText: !data.negativeText,
                      });
                    }}
                    className="group flex w-8 flex-none cursor-pointer rounded-full bg-gray-900 p-px ring-1 ring-inset ring-gray-900/5 transition-colors duration-200 ease-in-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 data-[checked]:bg-[#13EE8B]"
                  >
                    <span className="sr-only">Negative Text</span>
                    <span
                      aria-hidden="true"
                      className="size-4 transform rounded-full bg-white shadow-sm ring-1 ring-gray-900/5 transition duration-200 ease-in-out group-data-[checked]:translate-x-3.5"
                    />
                  </Switch>
                </div>
                <Label className="text-xs xl:text-sm text-nowrap text-white">
                  Negative Text
                </Label>
              </Field>
              <Field className="flex justify-center items-center gap-x-1 xl:gap-x-4 sm:col-span-2">
                <div className="flex h-6 items-center">
                  <Switch
                    checked={data.enhancePrompt}
                    onChange={() => {
                      setData({
                        ...data,
                        enhancePrompt: !data.enhancePrompt,
                      });
                    }}
                    className="group flex w-8 flex-none cursor-pointer rounded-full bg-gray-900 p-px ring-1 ring-inset ring-gray-900/5 transition-colors duration-200 ease-in-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 data-[checked]:bg-[#13EE8B]"
                  >
                    <span className="sr-only">Enhanced Prompt</span>
                    <span
                      aria-hidden="true"
                      className="size-4 transform rounded-full bg-white shadow-sm ring-1 ring-gray-900/5 transition duration-200 ease-in-out group-data-[checked]:translate-x-3.5"
                    />
                  </Switch>
                </div>
                <Label className="text-xs xl:text-sm text-nowrap text-white">
                  Enhanced Prompt
                </Label>
              </Field>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex justify-between items-center w-fit  focus-within:relative focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-[#13EE8B]">
                <select
                  id="model"
                  name="model"
                  autoComplete="model"
                  aria-label="model"
                  className=" w-full appearance-none rounded-md py-2 pl-3.5 pr-7  text-xs xl:text-base text-gray-500 placeholder:text-gray-400   "
                >
                  {models.map((model) => (
                    <option key={model} value={model}>
                      {model}
                    </option>
                  ))}
                </select>
                <ChevronDownIcon
                  aria-hidden="true"
                  className="pointer-events-none  size-5 self-center justify-self-end text-black sm:size-4"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="block w-fit rounded-md bg-[#13EE8B] px-3.5 py-2.5 text-center text-xs xl:text-sm text-nowrap font-semibold text-black hover:text-[#13EE8B] shadow-sm hover:bg-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 simpleTransition"
              >
                {loading ? "Generating..." : "Generate Skybox"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};
