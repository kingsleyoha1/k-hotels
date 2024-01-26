import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { requireAuth, validateRequest } from '@kingsley555/common-module-k-hotels';
import { Hotel } from '../../models/hotel';
import Cloudinary  from '../../ultils/cloudinary';

const router = express.Router();

router.post(
    '/api/hotels',
    requireAuth,
    [
      body('name').not().isEmpty().withMessage('Name is required'),
      body('location').not().isEmpty().withMessage('Location is required')
    ],
    validateRequest,
    async (req: Request, res: Response) => {
      const { name, location, image } = req.body;
      let imageUrl;
  
      try {
        if (image) {
          const uploadedResponse = await Cloudinary.uploader.upload(image, {
            upload_preset: "kHotels",
          });
          imageUrl = uploadedResponse.url;
        }
  
        const hotel = Hotel.build({
          name,
          location,
          userId: req.currentUser!.id,
          image: imageUrl, 
        });
  
        await hotel.save();
        res.status(201).send(hotel);
      } catch (error) {
        console.error('Error uploading image or saving hotel:', error);
        res.status(500).send(error);
      }
    }
  );

export { router as createHotelRouter };
