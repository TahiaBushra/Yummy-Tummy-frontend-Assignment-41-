"use client";

import { cuisineList } from "@/config/page";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import AddMenuSection from "./AddMenuSection";
import { Checkbox } from "./ui/checkbox";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";

const formSchema = z.object({
  restaurantName: z.string({ required_error: "restaurant name is required" }),
  country: z.string({ required_error: "country is required" }),
  city: z.string({ required_error: "city is required" }),
  deliveryPrice: z.coerce.number({
    required_error: "delivery price is required",
  }),
  estimatedDeliveryTime: z.coerce.number({
    required_error: "estimated delivery time is required",
  }),
  cuisines: z
    .array(z.string())
    .nonempty({ message: "please select at least one item" }),
  menuItems: z.array(
    z.object({
      name: z.string().min(1, "name is required"),
      price: z.coerce.number().min(1, "price is required"),
    })
  ),
  imageFile: z.instanceof(File, { message: "image is required" }),
});

export type RestaurantFormDataType = z.infer<typeof formSchema>;

interface Props {
  onSave: (restaurantFormData: RestaurantFormDataType) => void;
  isLoading: boolean;
}

const ManageRestaurantForm = ({ onSave, isLoading }: Props) => {
  const form = useForm<RestaurantFormDataType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      restaurantName: "",
      country: "",
      city: "",
      deliveryPrice: 0,
      estimatedDeliveryTime: 0,
      cuisines: [],
      menuItems: [{ name: "", price: 0 }],
      imageFile: undefined,
    },
  });
  const onSubmit = (formDataJson: RestaurantFormDataType) => {
    console.log(formDataJson);
  };
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="container mt-20 mx-auto space-y-10"
      >
        {/* Details Section */}
        <div className="space-y-5">
          <div>
            <h2 className="font-bold text-2xl">Restaurant details</h2>
            <FormDescription>Write down about your restaurant</FormDescription>
          </div>

          <FormField
            control={form.control}
            name="restaurantName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <FormField
              control={form.control}
              name="country"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Country</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>City</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="deliveryPrice"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Delivery price (USD)</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="10.99" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="estimatedDeliveryTime"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Estimated delivery time (min)</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="25" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        {/* Cuisines Section */}
        <div className="space-y-5">
          <div>
            <h2 className="font-bold text-2xl">Cuisines</h2>
            <FormDescription>
              Select the cuisines that your restaurant serves
            </FormDescription>
          </div>

          <FormField
            control={form.control}
            name="cuisines"
            render={({ field }) => (
              <FormItem>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                  {cuisineList.map((item) => (
                    <FormItem key={item} className="flex items-center gap-2">
                      <FormControl>
                        <Checkbox
                          checked={field.value.includes(item)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              field.onChange([...field.value, item]);
                            } else {
                              field.onChange(
                                field.value.filter(
                                  (val: string) => val !== item
                                )
                              );
                            }
                          }}
                        />
                      </FormControl>
                      <FormLabel>{item}</FormLabel>
                    </FormItem>
                  ))}
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Add Menu Section */}
        <AddMenuSection />

        {/* Image Section */}
        <div className="space-y-5">
          <div>
            <h2 className="font-bold text-2xl">Image</h2>
            <FormDescription>Add an image to your restaurant</FormDescription>
          </div>

          <div className="flex flex-col w-1/2 gap-5">
            <FormField
              control={form.control}
              name="imageFile"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      type="file"
                      accept=".jpg, .png, .jpeg"
                      onChange={(event) =>
                        field.onChange(
                          event.target.files ? event.target.files[0] : null
                        )
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        {/* Submitt Button */}
        <Button className="bg-pink-500" size="lg" disabled={isLoading}>
          {isLoading ? (
            <span className="flex items-center gap-2">
              <Loader2 size={18} className="animate-spin" />
              Submitting
            </span>
          ) : (
            <span>Submit</span>
          )}
        </Button>
      </form>
    </Form>
  );
};

export default ManageRestaurantForm;