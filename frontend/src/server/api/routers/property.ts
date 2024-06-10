import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import piniata from "../piniata";
import { type PinataPinOptions } from "@pinata/sdk";


export const propertyRouter = createTRPCRouter({
    create:publicProcedure
    .input(z.object(
        { 
            name: z.string(),
            description:z.string(),
            price:z.number(),
            address:z.string(),
            city:z.string(),
            country:z.string(),
            zipcode:z.string(),
            nr_rooms:z.number(),
            nr_baths:z.number(),
            property_type:z.enum(["House", "Apartment"]),
            accomodation_type:z.enum(["Buy", "Rent"]),
            thumbnail:z.string(),
            gallery:z.array(z.string()),
            availeble:z.boolean(),
            owner:z.string(),
            available:z.boolean(),
            created_at:z.date(),
            updated_at:z.date(),            


        }
    ))
    .mutation(async ({ ctx, input }) => {
        // simulate a slow db call
        const property = await ctx.db.property.create({
            data:{
                name: input.name,
                description:input.description,
                price:input.price,
                address:input.address,
                city:input.city,
                country:input.country,
                zipcode:input.zipcode,
                nr_baths:input.nr_baths,
                nr_rooms:input.nr_rooms,
                property_type:input.property_type,
                accomodation_type:input.accomodation_type,
                thumbnail:"https://blue-historical-tapir-536.mypinata.cloud/ipfs/QmRX1b5dd6aLm4bLoKTnCHgJ2mBVnkMVNob638HrsNQrrX",
                gallery:["https://blue-historical-tapir-536.mypinata.cloud/ipfs/QmRX1b5dd6aLm4bLoKTnCHgJ2mBVnkMVNob638HrsNQrrX","https://blue-historical-tapir-536.mypinata.cloud/ipfs/QmaEc2Dar1B4xP1FqZBsgoRx9fj8phNdAUiLvKsghR6yQd","https://blue-historical-tapir-536.mypinata.cloud/ipfs/QmbMsS3grU1yE1EXmGVRDhSiiVR2ECjnSenvhTU93H9k24" ],
                available:input.availeble,
                owner:input.owner,
                createdAt:input.created_at,
                updatedAt:input.updated_at,
            }
        })
       
        const options = {
          pinataMetadata: {
              name: property.name,
              keyvalues: {
                  id: property.id,
                  owner: property.owner
              }
          },
          pinataOptions: {
              cidVersion: 0
          }
      };
      
        const ipfs = await piniata.pinJSONToIPFS(property, options);
        await ctx.contract.methods.listProperty!("https://blue-historical-tapir-536.mypinata.cloud/ipfs/"+ipfs.IpfsHash).call();
        
    }),

    getAll:publicProcedure
    .input(z.object({
      take:z.number(),
      skip:z.number(),
    }).optional().default({
      take:10,
      skip:0
    }))
    .query(async ({ input, ctx }) => {
      return await ctx.db.property.findMany({
        take:input.take,
        skip:input.skip,
        select:{
          id:true,
          name:true,
          description:true,
          price:true,
          address:true,
          city:true,
          country:true,
          zipcode:true,
          nr_rooms:true,
          nr_baths:true,
          property_type:true,
          accomodation_type:true,
          thumbnail:true,
          gallery:true,
          available:true,
          owner:true,
          
        }
      });
    }),

    getByFilter:publicProcedure
    .input(z.object({
      nr_rooms:z.number().optional(),
      nr_baths:z.number().optional(),
      min_price:z.number().optional(),
      max_price:z.number().optional(),
      property_type:z.enum(["House", "Apartment"]).optional(),
      accomodation_type:z.enum(["Buy", "Rent"]).optional(),
      address:z.string().optional(),
      zipcode:z.string().optional(),
      city:z.string().optional(),
      country:z.string().optional(),
      skip:z.number().optional().default(0),
      take:z.number().optional().default(5),

    }))
    .query(async ({ input, ctx }) => {
      console.log(input);
      return await ctx.db.property.findMany({

        
        where:{
          address:input.address,
          city:input.city,
          country:input.country,
          zipcode:input.zipcode,
          accomodation_type:input.accomodation_type,
          property_type:input.property_type,
          nr_rooms:input.nr_rooms,
          nr_baths:input.nr_baths,
          price:{
            gte:input.min_price,
            lte:input.max_price
          }
        },
        take:input.take,
        skip:input.skip,
        select:{
          id:true,
          name:true,
          description:true,
          price:true,
          address:true,
          city:true,
          country:true,
          zipcode:true,
          nr_rooms:true,
          nr_baths:true,
          property_type:true,
          accomodation_type:true,
          thumbnail:true,
          gallery:true,
          available:true,
          owner:true,
        },
        
      });

})})
