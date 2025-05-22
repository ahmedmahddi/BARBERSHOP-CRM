import { v4 as uuidv4 } from "uuid";
import { supabase } from "../../core/supabase.client";

/** Interface for upload result */
export interface UploadResult {
  path: string;
  url: string | null;
  error?: string;
}

/** Upload file to Supabase storage */
export async function uploadFile(
  file: Express.Multer.File,
  bucket: string,
  folder: string = ""
): Promise<UploadResult> {
  try {
    // Generate unique filename
    const fileExtension = file.originalname.split(".").pop();
    const fileName = `${uuidv4()}.${fileExtension}`;

    // Create file path
    const filePath = folder ? `${folder}/${fileName}` : fileName;

    // Upload file to Supabase storage
    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(filePath, file.buffer, {
        contentType: file.mimetype,
        upsert: false,
      });

    if (error) {
      console.error("Error uploading file:", error);
      return {
        path: "",
        url: null,
        error: `Failed to upload file: ${error.message}`,
      };
    }

    // Get signed URL with expiration (7 days)
    try {
      // Generate a signed URL that expires in 7 days
      const { data: urlData } = await supabase.storage
        .from(bucket)
        .createSignedUrl(data.path, 60 * 60 * 24 * 7); // 7 days in seconds
      
      // Log detailed information about the URL generation
      console.log('File upload details:', {
        path: data.path,
        bucket: bucket,
        signedUrl: urlData?.signedUrl ? 'Generated successfully' : 'Failed to generate',
        expiresIn: '7 days',
        supabaseUrl: process.env.SUPABASE_URL
      });
      
      // Ensure the URL is properly formed
      if (!urlData?.signedUrl) {
        console.error('No signed URL generated from Supabase');
        
        // Fallback: construct URL manually if Supabase didn't return one
        // Note: This manual URL won't work without proper signing
        const manualUrl = `${process.env.SUPABASE_URL}/storage/v1/object/sign/${bucket}/${data.path}`;
        console.log('Warning: Manual URL construction attempted, but this will not work without proper signing:', manualUrl);
        
        return {
          path: data.path,
          url: null,
          error: 'Failed to generate signed URL'
        };
      }
      
      console.log('Signed URL generated successfully');
      
      return {
        path: data.path,
        url: urlData.signedUrl,
      };
    } catch (error) {
      console.error('Error generating public URL:', error);
      return {
        path: data.path,
        url: null,
        error: 'Failed to generate public URL'
      };
    }
  } catch (error) {
    console.error("Error in uploadFile:", error);
    return {
      path: "",
      url: null,
      error: "Internal server error during file upload",
    };
  }
}

/** Delete file from Supabase storage */
export async function deleteFile(
  path: string,
  bucket: string
): Promise<{ success: boolean; error?: string }> {
  try {
    const { error } = await supabase.storage.from(bucket).remove([path]);

    if (error) {
      return {
        success: false,
        error: `Failed to delete file: ${error.message}`,
      };
    }

    return { success: true };
  } catch (error) {
    console.error("Error in deleteFile:", error);
    return {
      success: false,
      error: "Internal server error during file deletion",
    };
  }
}
