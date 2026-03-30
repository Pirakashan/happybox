<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\ExploreNode;
use App\Models\ExploreNodeGallery;
use Illuminate\Support\Str;

class ExploreUsDynamicSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $baseUrl = 'http://localhost:8000/assets/images/';

        // 1. EVENT PLANNING & COORDINATION
        $eventRoot = ExploreNode::create([
            'title' => 'Event Planning & Coordination',
            'slug' => 'event-planning-coordination',
            'description' => 'Comprehensive event management from concept to execution.',
            'image_path' => $baseUrl . 'event_planning.png',
            'type' => 'root',
            'order_index' => 1
        ]);

        $eventGroups = [
            [
                'title' => 'Personal Celebrations',
                'slug' => 'personal-celebrations',
                'items' => ['Weddings', 'Engagement Ceremonies', 'Birthdays (Kids & Adults)', 'Anniversaries', 'Surprise Parties', 'Private Parties', 'Proposal Setups']
            ],
            [
                'title' => 'Traditional & Cultural Events',
                'slug' => 'traditional-cultural-events',
                'items' => ['Puberty Ceremonies', 'House Opening / Housewarming', 'Religious Ceremonies', 'Family Get-Togethers']
            ],
            [
                'title' => 'Corporate & Business Events',
                'slug' => 'corporate-business-events',
                'items' => ['Shop Openings', 'Business Launches', 'Annual Meetings', 'Corporate Parties', 'Award Ceremonies', 'Conferences & Seminars']
            ]
        ];

        $serviceCategories = [
            'Guest & Travel Services' => [
                'Airport pickup & drop-off arrangements',
                'VIP guest transportation',
                'Hotel booking coordination',
                'Travel itinerary assistance'
            ],
            'Venue & Setup Services' => [
                'Venue sourcing & booking',
                'Stage design & decoration',
                'Seating & table arrangements',
                'Lighting & sound system setup'
            ],
            'Vendor Coordination' => [
                'Catering services',
                'Photography & videography',
                'DJ & live entertainment',
                'Makeup artists & stylists',
                'Traditional ceremony specialists'
            ],
            'Event Experience Enhancements' => [
                'Customized backdrops',
                'LED screens & multimedia displays',
                'Fireworks & special effects',
                'Dance performances',
                'Emcee (MC) arrangements'
            ],
            'Documentation & Media' => [
                'Professional photography',
                'Cinematic event videography',
                'Drone coverage',
                'Live streaming for overseas family',
                'Same-day edited highlight videos'
            ],
            'Guest Management' => [
                'Invitation design & printing',
                'RSVP management',
                'Guest list coordination',
                'On-site reception desk',
                'Event day coordination team'
            ],
            'Overseas Client Support' => [
                'Virtual planning meetings',
                'Budget tracking & reporting',
                'Vendor payment handling',
                'Real-time event updates',
                'Photo & video proof delivery'
            ]
        ];

        foreach ($eventGroups as $idx => $groupData) {
            $group = ExploreNode::create([
                'parent_id' => $eventRoot->id,
                'title' => $groupData['title'],
                'slug' => $groupData['slug'],
                'type' => 'group',
                'order_index' => $idx
            ]);

            foreach ($groupData['items'] as $itemIdx => $itemName) {
                $category = ExploreNode::create([
                    'parent_id' => $group->id,
                    'title' => $itemName,
                    'slug' => Str::slug($itemName . '-' . $group->slug),
                    'type' => 'category',
                    'order_index' => $itemIdx,
                    'description' => "Professional planning and management for $itemName."
                ]);

                // For each category, add the 7 service groups
                foreach ($serviceCategories as $srvGroupName => $srvItems) {
                    $srvGroupNode = ExploreNode::create([
                        'parent_id' => $category->id,
                        'title' => $srvGroupName,
                        'slug' => Str::slug($srvGroupName . '-' . $category->slug),
                        'type' => 'service_group'
                    ]);

                    foreach ($srvItems as $srvItemName) {
                        $leaf = ExploreNode::create([
                            'parent_id' => $srvGroupNode->id,
                            'title' => $srvItemName,
                            'slug' => Str::slug($srvItemName . '-' . $srvGroupNode->slug),
                            'type' => 'service_item',
                            'description' => "Our $srvItemName ensures your $itemName is perfect. We handle all logistics and coordination to provide a seamless experience.",
                            'content' => "This is a detailed description of our $srvItemName. We provide end-to-end support, professional staff, and high-quality equipment to meet your specific needs."
                        ]);
                        
                        // Add some dummy gallery images
                        ExploreNodeGallery::create(['explore_node_id' => $leaf->id, 'image_path' => $baseUrl . 'wedding.png']);
                        ExploreNodeGallery::create(['explore_node_id' => $leaf->id, 'image_path' => $baseUrl . 'birthday.png']);
                    }
                }
            }
        }

        // 2. CUSTOMIZED GIFT SOLUTIONS
        $giftRoot = ExploreNode::create([
            'title' => 'Customized Gift Solutions',
            'slug' => 'customized-gift-solutions',
            'description' => 'Personalized gifts tailored to your unique needs.',
            'image_path' => $baseUrl . 'gift_set_1.png',
            'type' => 'root',
            'order_index' => 2,
            'metadata' => [
                'whatsapp_number' => '+94700000000',
                'wa_message' => 'Hi Happy Box, I would like to request a customized gift.'
            ]
        ]);

        $customGifts = [
            ['title' => 'Eternal Rose Box', 'image' => 'gift_set_2.png', 'desc' => 'Handcrafted roses with personalized notes.'],
            ['title' => 'Luxury Grooming Kit', 'image' => 'gift_set_3.png', 'desc' => 'Custom engraved grooming essentials.'],
            ['title' => 'Memory Scrapbook', 'image' => 'birthday.png', 'desc' => 'High-quality prints with custom illustrations.']
        ];

        foreach ($customGifts as $gift) {
            $node = ExploreNode::create([
                'parent_id' => $giftRoot->id,
                'title' => $gift['title'],
                'slug' => Str::slug($gift['title']),
                'description' => $gift['desc'],
                'image_path' => $baseUrl . $gift['image'],
                'type' => 'gallery_item'
            ]);
        }

        // 3. PERSONAL SHOPPING & INTERNATIONAL DELIVERY
        $shoppingRoot = ExploreNode::create([
            'title' => 'Personal Shopping & International Delivery',
            'slug' => 'personal-shopping-international-delivery',
            'description' => 'We shop and deliver across the globe for you.',
            'image_path' => $baseUrl . 'hero_premium.png',
            'type' => 'root',
            'order_index' => 3,
            'metadata' => [
                'delivery_partner' => 'Arul Global Express',
                'whatsapp_number' => '+94700000000',
                'wa_message' => 'Hi Happy Box, I need help with personal shopping and international delivery.'
            ]
        ]);

        ExploreNode::create([
            'parent_id' => $shoppingRoot->id,
            'title' => 'What We Do',
            'slug' => 'what-we-do-shopping',
            'content' => 'We provide specialized shopping services for overseas Sri Lankans who want to send local products or gifts to their loved ones, or vice versa.',
            'type' => 'info_section'
        ]);

        ExploreNode::create([
            'parent_id' => $shoppingRoot->id,
            'title' => 'Delivery Process',
            'slug' => 'delivery-process',
            'content' => '1. You request a product. 2. We source it. 3. We pack it securely. 4. We ship via our global partners.',
            'type' => 'info_section'
        ]);
    }
}
