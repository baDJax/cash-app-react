import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as cashCountSlice from "../features/cashCountSlice";
import CalenderComponent from "@/components/Calender";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RootState } from "@/store/cashStore";

const AddAmount: React.FC = () => {
  const dispatch = useDispatch();
  const entryData = useSelector((state: RootState) => state.root);

  const [errors, setErrors] = useState<{ amount?: string }>({});
  const initialState = {
    id: "",
    amount: 0,
    notes: "",
    date: "",
    category: "",
  };
  const [entry, setEntry] = useState(initialState);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEntry((prev) => ({
      ...prev,
      [name]: name === "amount" ? Number(value) : value,
    }));
    if (name === "amount") {
      setErrors((prev) => ({ ...prev, amount: "" }));
    }
  };

  const handleSelectCategory = (value: string) => {
    setEntry((prev) => ({ ...prev, category: value }));
  };

  const handleAmountChange = (isCashOut: boolean) => {
    if (entry.amount > 0) {
      const action = isCashOut
        ? cashCountSlice.addEntry
        : cashCountSlice.addEntry;
      dispatch(
        action({
          entries: [
            {
              ...entry,
              id: `INV${entryData?.entries.length}`,
              isCashIn: !isCashOut,
            },
          ],
          isCashIn: !isCashOut,
        })
      );
      setEntry(initialState);
      setErrors({});
    } else {
      setErrors({ amount: "Please enter a valid amount" });
    }
  };

  return (
    <div className="flex gap-4 flex-col w-full border border-white/15 p-4 rounded-md bg-[#131313]">
      <div className="flex flex-col gap-2">
        <label htmlFor="amount" className="py-1 flex gap-3">
          <p>Enter cash amount : *</p>
          {errors.amount && <p className="text-red-600">({errors.amount})</p>}
        </label>
        <input
          className={`bg-transparent border border-white/15 p-3 px-5 rounded-md ${
            errors.amount ? "border-red-600" : ""
          }`}
          type="number"
          name="amount"
          id="amount"
          placeholder="--"
          value={entry.amount || ""}
          onChange={handleChange}
        />
        <label htmlFor="notes" className="py-1">
          <p>Enter a note :</p>
        </label>
        <input
          className="bg-transparent border border-white/15 p-3 px-5 rounded-md"
          type="text"
          name="notes"
          id="notes"
          value={entry.notes}
          onChange={handleChange}
        />
        <CalenderComponent
          onChange={(date) => {
            if (date instanceof Date && !isNaN(date.getTime())) {
              // @ts-expect-error undefined type
              setEntry((prev) => ({ ...prev, date }));
            }
          }}
        />
        <label htmlFor="category" className="py-1">
          <p>Add / Select a category :</p>
        </label>
        <Select onValueChange={handleSelectCategory}>
          <input
            type="text"
            onChange={(e) => handleSelectCategory(e.target.value)}
            placeholder="Add Category"
            className="bg-transparent h-auto text-base border border-white/15 p-3 px-5 rounded-md placeholder:text-white"
          />
          <SelectTrigger className="bg-transparent h-auto text-base border border-white/15 p-3 px-5 rounded-md">
            <SelectValue placeholder="Select Category" />
            <input
              type="text"
              onChange={(e) => handleSelectCategory(e.target.value)}
              className="bg-transparent border-none p-0 m-0"
            />
          </SelectTrigger>
          <SelectContent className="bg-[#131313] border-white/15 text-white w-full">
            <SelectItem className="hover:bg-[#2e2e2e] p-3 px-5" value="--">
              --
            </SelectItem>
            {entryData?.categories &&
              entryData?.categories?.length > 0 &&
              entryData?.categories.map((category) => (
                <React.Fragment key={category?.name}>
                  {category?.name && (
                    <SelectItem
                      className="hover:bg-[#2e2e2e] p-3 px-5"
                      value={category?.name.toLowerCase()}
                    >
                      {category?.name}
                    </SelectItem>
                  )}
                </React.Fragment>
              ))}
          </SelectContent>
        </Select>
      </div>
      <div className="flex gap-4">
        <button
          className="w-full text-center px-4 py-3 bg-green-600 hover:bg-green-700 transition rounded-lg cursor-pointer"
          onClick={() => handleAmountChange(false)}
        >
          Cash In
        </button>
        <button
          className="w-full text-center px-4 py-3 bg-red-700 hover:bg-red-800 transition rounded-lg cursor-pointer"
          onClick={() => handleAmountChange(true)}
        >
          Cash Out
        </button>
      </div>
    </div>
  );
};

export default AddAmount;
